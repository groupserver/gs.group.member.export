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
        table=null;

    function members_request_success(data, textStatus, jqXHR) {
        toProcess = members = data;
        processed = [];
        member_next();
    }//success

    function error(jqXHR, textStatus, errorThrown) {
        // FIXME
    }//error

    function profile_error(jqXHR, textStatus, errorThrown) {
        var msg = '';
        msg = 'Issue with ' + currMember;
        console.warn(msg);
        member_next();
    }//profile_error

    function member_next() {
        currMember = toProcess.pop();
        if (currMember) {
            send_profile_request(currMember);
        }
    }//member_next

    function add_header_to_table(data) {
        var i=null, thead=null, tfoot=null, trHead=null, trFoot=null, th=null;
        thead = table.children('thead');
        tfoot = table.children('tfoot');
        trHead = thead.append('<tr>');
        trFoot = tfoot.append('<tr>');
        for (i in data) {
            th = '<th>' + i + '</th>';
            trHead.append(th);
            trFoot.append(th);
        }
    }//add_header_to_table

    function profile_request_success(data, textStatus, jqXHR) {
        var i=null, thead=null, tbody=null, tr=null, td=null;
        thead = table.children('thead');
        if (thead.children('tr').length == 0) {
            add_header_to_table(data);
        }
        tbody = table.children('tbody');
        tr = tbody.append('<tr>');
        for (i in data) {
            if (data[i] == null) {
                td = tr.append('<td>&#160;</td>');
            } else {
                td = tr.append('<td class="'+ i +'">' + data[i] + '</td>');
                console.info(td);
            }
        }
        processed.push(data['id']);
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
        table = jQuery(tableSelector);
        send_members_request();
    }//init
    init(); // Note: automatic execution
} // GSGroupMemberExport

jQuery(window).load(function () {
    var scriptElement=null, exporter=null;
    scriptElement = jQuery('#gs-group-member-export-js');
    exporter = GSGroupMemberExport(scriptElement.data('members-url'),
                                   scriptElement.data('table'));
});
