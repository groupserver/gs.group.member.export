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
import codecs
import os
from setuptools import setup, find_packages
from version import get_version

version = get_version()

with codecs.open('README.rst', encoding='utf-8') as f:
    long_description = f.read()
with codecs.open(os.path.join("docs", "HISTORY.rst"),
                 encoding='utf-8') as f:
    long_description += '\n' + f.read()

setup(
    name='gs.group.member.export',
    version=version,
    description="Export group member information as a CSV",
    long_description=long_description,
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        "Environment :: Web Environment",
        "Framework :: Zope2",
        "Intended Audience :: Developers",
        'License :: OSI Approved :: Zope Public License',
        "Natural Language :: English",
        "Natural Language :: French",
        "Natural Language :: German",
        "Operating System :: POSIX :: Linux",
        "Programming Language :: Python",
        "Programming Language :: JavaScript",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    keywords='user, group, member, group member, export, csv',
    author='Michael JasonSmith',
    author_email='mpj17@onlinegroups.net',
    url='https://github.com/groupserver/gs.group.member.export',
    license='ZPL 2.1',
    packages=find_packages(exclude=['ez_setup']),
    namespace_packages=['gs', 'gs.group', 'gs.group.member'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        'SQLAlchemy',
        'zope.browserpage',
        'zope.cachedescriptors',
        'zope.i18n[compile]',
        'zope.i18nmessageid',
        'zope.tal',
        'zope.tales',
        'zope.viewlet',
        'gs.database',
        'gs.group.base',
        'gs.group.member.base',
        'gs.group.member.info',
        'gs.group.member.viewlet',
        'gs.profile.json',
    ],
    entry_points="""
    # -*- Entry points: -*-
    """, )
