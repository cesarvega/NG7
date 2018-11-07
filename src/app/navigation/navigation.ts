import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'items',
                title    : 'items',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/items',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'users',
                title    : 'users',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/users',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'orders',
                title    : 'orders',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/orders',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'payment',
                title    : 'payment',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/payment',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'profile',
                title    : 'profile',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/profile',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'schedule',
                title    : 'schedule',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/schedule',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'subscription',
                title    : 'subscription',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/subscription',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }    
        ]
    },
    {
        id: 'settings',
        title: 'Settings',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'settings',
        children: [                   
            {
                id: 'Settings',
                title: 'Help',
                // translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'settings',
                children: [
                    {
                        id: 'FAQ',
                        title: 'FAQ',
                        // translate: 'NAV.HELP',
                        type: 'item',
                        icon: 'help',
                        url: '/login/faq'
                    },
                    {
                        id: 'Contact',
                        title: 'Contact Us',
                        // translate: 'NAV.HELP',
                        type: 'item',
                        icon: 'call',
                        url: '/login/contact-us'
                    },
                    {
                        id: 'change-password',
                        title: 'Reset Password',
                        type: 'item',
                        icon: 'vpn_key',
                        url: '/login/change-password'
                    },
                    {
                        id: 'unsubscribe',
                        title: 'Unsubscribe',
                        type: 'item',
                        icon: 'thumb_down',
                        url: '/login/unsubscribe'
                    },
                    {
                        id: 'tell-a-friend',
                        title: 'Tell-a-friend',
                        type: 'item',
                        icon: 'child_care',
                        url: '/login/tell-a-friend'
                    }
                ]
            },
            {
                id: 'Logout',
                title: 'logout',
                // translate: 'NAV.HELP',
                type: 'item',
                icon: 'settings_power',
                url: '/login/auth/login'
            }]
    }
];
