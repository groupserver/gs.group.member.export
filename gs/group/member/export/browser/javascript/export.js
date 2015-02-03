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

function GSGroupMemberExport (parserURL, tableSelector) {
    var members=null, toProcess=null, processed=null, currMember=null,
        membersTable=null;

    function members_request_success(data, textStatus, jqXHR) {
        toProcess = members = data;
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
        currMember = toProcess.pop();
        if (currMember) {
            send_profile_request(currMember);
        } else {
            dump_csv();
        }
    }//member_next

    function dump_csv() {
        // Based on 
        // <http://www.zachhunter.com/2010/11/download-json-to-csv-using-javascript/>
        var outstr='';
        for (var row = 0; row < membersTable.length; row++) {
            var outLine = '';
            for (var field in membersTable[row]) {
                var cell=null, outCell='';
                if(outLine != '') {
                    outLine += ',';
                }
                cell = membersTable[row][field];
                if (cell == null) {
                    cell = '';
                } else if (typeof(cell) !== 'string') {
                    cell = cell.toString();
                }
                cell = cell.replace(/\"/g,'""').replace(/\n/g,'\\n');
                outCell = '"' + cell  + '"';
                outLine += outCell;
            }
            outstr += outLine + '\r\n';
        }
        window.open('data:text/csv;charset=utf-8,' + escape(outstr));
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
        send_members_request();
    }//init
    init(); // Note: automatic execution
} // GSGroupMemberExport

jQuery(window).load(function () {
    var scriptElement=null, exporter=null;
    scriptElement = jQuery('#gs-group-member-export-js');
    exporter = GSGroupMemberExport(scriptElement.data('members-url'));
});
