==========================
``gs.group.member.export``
==========================
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Export group member information as a CSV
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:Author: `Michael JasonSmith`_
:Contact: Michael JasonSmith <mpj17@onlinegroups.net>
:Date: 2015-01-30
:Organization: `GroupServer.org`_
:Copyright: This document is licensed under a `Creative Commons
            Attribution-Share Alike 4.0 International License`_
            by `OnlineGroups.net`_.

..  _Creative Commons Attribution-Share Alike 4.0 International License:
    http://creativecommons.org/licenses/by-sa/4.0/

Introduction
============

This product supplies the `Export page`_, the `Members JSON
data`_, and the `Export JavaScript`_ for a GroupServer_ group.

Export page
===========

The *Export* page (``export.html`` in the group context) produces
a CSV that contains the profile information of all the group
members. It does this by querying the JSON information for all
the group members (see `gs.profile.json`_) and assembling it into
a CSV file using JavaScript.

.. _gs.profile.json: https://github.com/groupserver/gs.profile.json

Members JSON data
=================

The members JSON data (``members.json`` in the group context) is
a JSON list of all the members in the group. Each member is
represented by a nickname, if set, or the user identifier for
their profile. 

To ensure privacy, only administrators of the group can retrieve
members JSON object.

Export JavaScript
=================

The JavaScript ``gs-group-members-export-20150202.js`` retrieves
the `members JSON data`_ and then, for each member, retrieves the
profile as a JSON object [#profileJSON]_.

Resources
=========

- Code repository: https://github.com/groupserver/gs.group.member.export
- Translations: https://www.transifex.com/projects/p/gs-group-member-export/
- Questions and comments to http://groupserver.org/groups/development
- Report bugs at https://redmine.iopen.net/projects/groupserver

.. _GroupServer: http://groupserver.org/
.. _GroupServer.org: http://groupserver.org/
.. _OnlineGroups.Net: https://onlinegroups.net
.. _Michael JasonSmith: http://groupserver.org/p/mpj17

.. [#profileJSON] See the ``gs.profile.json`` product 
                  <https://github.com/groupserver/gs.profile.json>

..  LocalWords:  CSV JSON
