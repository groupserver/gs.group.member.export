# -*- coding: utf-8 -*-
############################################################################
#
# Copyright © 2015 OnlineGroups.net and Contributors.
# All Rights Reserved.
#
# This software is subject to the provisions of the Zope Public License,
# Version 2.1 (ZPL).  A copy of the ZPL should accompany this distribution.
# THIS SOFTWARE IS PROVIDED "AS IS" AND ANY AND ALL EXPRESS OR IMPLIED
# WARRANTIES ARE DISCLAIMED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF TITLE, MERCHANTABILITY, AGAINST INFRINGEMENT, AND FITNESS
# FOR A PARTICULAR PURPOSE.
#
############################################################################
from __future__ import absolute_import, unicode_literals
from json import dumps as dump_json
from zope.cachedescriptors.property import Lazy
from gs.group.base import GroupPage
from gs.group.member.base import get_group_userids
from .queries import ExportQuery


class Export(GroupPage):
    'The Export Group Members page'


class MembersJSON(GroupPage):
    'The list of group-members as a JSON object'

    @Lazy
    def memberIds(self):
        retval = get_group_userids(self.context, self.groupInfo)
        return retval

    @Lazy
    def query(self):
        retval = ExportQuery()
        return retval

    @Lazy
    def nicknames(self):
        retval = [self.query.nickname_or_uid(mId) for mId in self.memberIds]
        return retval

    def __call__(self):
        self.request.response.setHeader(b'Content-Type',
                                        b'application/json')
        retval = dump_json(self.nicknames)
        return retval
