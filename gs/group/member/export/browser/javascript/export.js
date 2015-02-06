"use strict";
// Copyright © 2015 OnlineGroups.net and Contributors.
// All Rights Reserved.
//
// This software is subject to the provisions of the Zope Public License,
// Version 2.1 (ZPL). http://groupserver.org/downloads/license/
//
// THIS SOFTWARE IS PROVIDED "AS IS" AND ANY AND ALL EXPRESS OR IMPLIED
// WARRANTIES ARE DISCLAIMED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST INFRINGEMENT, AND
// FITNESS FOR A PARTICULAR PURPOSE.
jQuery.noConflict();

function GSGroupMemberExport (parserURL, progressBarSelector) {
    var members=null, toProcess=null, processed=null, currMember=null,
        membersTable=null, progressBar=null, 
        GENERATED='generated_event';

    function members_request_success(data, textStatus, jqXHR) {
        toProcess = data.slice(0);  // Copy it
        members = data;  // Reference it
        membersTable = [];
        processed = [];
        member_next();
    }//success

    function error(jqXHR, textStatus, errorThrown) {
        // FIXME
    }//error

    function profile_error(jqXHR, textStatus, errorThrown) {
        member_next();
    }//profile_error

    function member_next() {
        var pc=0;
        currMember = toProcess.pop();
        if (currMember) {
            send_profile_request(currMember);
        } else {
            // Raise the GENERATED event.
            progressBar.trigger(GENERATED);
        }
        pc = ((members.length - toProcess.length) / (members.length * 1.0)) * 100;
        progressBar.css('width', pc.toString()+'%')
    }//member_next

    function quote_cell(value) {
        var retval=null;
        retval = '"' + value.replace(/\"/g,'""') + '"';
        return retval
    }//quote_cell

    function dump_csv() {
        // Based on 
        // <http://www.zachhunter.com/2010/11/download-json-to-csv-using-javascript/>
        var retval='', outLine='', field=null, row=null, cell=null;
        // Add the header
        for (field in membersTable[0]) {
            if(outLine != '') {
                outLine += ',';
            }
            outLine += quote_cell(field);
        }
        retval += outLine + '\r\n';
        // Add the body
        for (row = 0; row < membersTable.length; row++) {
            outLine = '';
            for (field in membersTable[row]) {
                cell=null;
                if(outLine != '') {
                    outLine += ',';
                }
                cell = membersTable[row][field];
                if (cell == null) {
                    cell = '';
                } else if (typeof(cell) !== 'string') {
                    cell = cell.toString();
                }
                outLine += quote_cell(cell);
            }
            retval += outLine + '\r\n';
        }
        return retval;
    }//dump_csv

    function profile_request_success(data, textStatus, jqXHR) {
        if (data['email'].length == 0) {
            console.info('Skipping ' + data['id']);
        } else {
            membersTable.push(data);
        }
        member_next();
    }//profile_request_success

    function send_profile_request(userId) {
        var settings=null, profileUrl=null;
        profileUrl = '/p/' + userId + '/profile.json';
        settings = {
            accepts: 'application/json',
            async: true,
            cache: false,
            contentType: false,
            crossDomain: false,
            data: null,
            dataType: 'json',
            error: profile_error,
            headers: {},
            processData: false,  // No jQuery, put the data down.
            success: profile_request_success,
            traditional: true,
            // timeout: TODO, What is the sane timeout?
            type: 'POST',
            url: profileUrl,
        };
        jQuery.ajax(settings);
    }//send_profile_request
    
    function send_members_request() {
        var settings=null;
        // The following is *mostly* a jQuery.post call:
        // jQuery.post(URL, d, success, 'application/json');
        settings = {
            accepts: 'application/json',
            async: true,
            cache: false,
            contentType: false,
            crossDomain: false,
            data: null,
            dataType: 'json',
            error: error,
            headers: {},
            processData: false,  // No jQuery, put the data down.
            success: members_request_success,
            traditional: true,
            // timeout: TODO, What is the sane timeout?
            type: 'POST',
            url: parserURL,
        };
        jQuery.ajax(settings);
    }//send_request
    
    function init() {
        progressBar = jQuery(progressBarSelector);
    }//init
    init(); // Note: automatic execution

    return {
        generate: function () {send_members_request();},
        get_csv_link: function () {
            var csv=null, csvBlob=null, retval=null;
            csv = dump_csv();
            csvBlob = new Blob([csv], {type: 'text/csv'});
            retval = URL.createObjectURL(csvBlob);
            return retval;
        },
        GENERATED_EVENT: GENERATED
    };
} // GSGroupMemberExport

jQuery(window).load(function () {
    var scriptElement=null, exporter=null, saveButton=null, generateButton=null,
        progressBar=null;
    scriptElement = jQuery('#gs-group-member-export-js');
    exporter = GSGroupMemberExport(scriptElement.data('members-url'),
                                   scriptElement.data('progress-bar'));

    generateButton = jQuery(scriptElement.data('generate-button'));
    generateButton.removeAttr('href');
    generateButton.click(function () {
        jQuery(this).attr('disabled', 'disabled')
            .text(scriptElement.data('generate-present-continuous'));
        exporter.generate();
    });

    saveButton = jQuery(scriptElement.data('save-button'));
    saveButton.removeAttr('href').attr('disabled', 'disabled');

    progressBar = jQuery(scriptElement.data('progress-bar'));
    progressBar.on(exporter.GENERATED_EVENT, function () {
        var dataURI=null;
        generateButton.text(scriptElement.data('generate-past'));

        dataURI = exporter.get_csv_link()
        saveButton.attr('href', dataURI);
        saveButton.removeAttr('disabled');
    });
});
