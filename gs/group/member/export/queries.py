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
import sqlalchemy as sa
from gs.database import getTable, getSession


class ExportQuery(object):
    def __init__(self):
        self.nicknameTable = getTable('user_nickname')

    def nickname_or_uid(self, uid):
        'Get the nickname, if set, or the user ID'
        unt = self.nicknameTable
        cols = [unt.c.nickname]
        s = sa.select(cols, order_by=sa.desc(unt.c.date), limit=1)
        s.append_whereclause(unt.c.user_id == uid)

        session = getSession()
        r = session.execute(s)
        if r.rowcount:
            retval = r.fetchone()['nickname']
        else:
            retval = uid
        assert retval
        return retval
