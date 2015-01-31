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
:Copyright: This document is licensed under a
`Creative Commons Attribution-Share Alike 4.0 International License`_
  by `OnlineGroups.net`_.

..  _Creative Commons Attribution-Share Alike 4.0 International License:
    http://creativecommons.org/licenses/by-sa/4.0/

Introduction
============

This product supplies the `Export page`_ for a GroupServer_ group.

Export page
===========

The *Export* page (``export.html`` in the group context) produces
a CSV that contains the profile information of all the group
members. It does this by querying the JSON information for all
the group members (see `gs.profile.json`_) and assembling it into
a CSV file using JavaScript.

.. _gs.profile.json: https://github.com/groupserver/gs.profile.json


Resources
=========

- Code repository: https://github.com/groupserver/gs.group.member.export
- Questions and comments to http://groupserver.org/groups/development
- Report bugs at https://redmine.iopen.net/projects/groupserver

.. _GroupServer: http://groupserver.org/
.. _GroupServer.org: http://groupserver.org/
.. _OnlineGroups.Net: https://onlinegroups.net
.. _Michael JasonSmith: http://groupserver.org/p/mpj17

..  LocalWords:  CSV JSON
