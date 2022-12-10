import { getInitialValue, ParseSchema } from './schma_parser'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useState, useEffect } from 'react'
import { clientAppURL } from '../../config/urlcontrol'
const figma_template = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   defaultProperties: [],
   definitions: {
      ButtonType: {
         description: 'Available variants for the call to action buttons',
         enum: ['link', 'logo-link', 'open-video'],
         title: 'ButtonType',
         type: 'string',
      },
      ClientsProps: {
         defaultProperties: [],
         properties: {
            grayscale: {
               default: false,
               description:
                  'if true a grayscale filter will be applied on not hovered items',
               title: 'grayscale',
               type: 'boolean',
            },
            items: {
               description: 'Clients list',
               items: {
                  defaultProperties: [],
                  properties: {
                     description: {
                        description:
                           'A short description of the client and what they do',
                        title: 'description',
                        type: 'string',
                     },
                     logo: {
                        description: 'A logo for the client',
                        title: 'logo',
                        type: 'string',
                     },
                     name: {
                        description: 'Name of the client',
                        title: 'name',
                        type: 'string',
                     },
                     url: {
                        description:
                           "The client's website, portfolio, etc. if they have one",
                        title: 'url',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'items',
               type: 'array',
            },
            withCaption: {
               default: false,
               description:
                  'if true the client name will be rendered as caption at the bottom',
               title: 'withCaption',
               type: 'boolean',
            },
         },
         title: 'ClientsProps',
         type: 'object',
      },
      FooterProps: {
         defaultProperties: [],
         properties: {
            copyright: {
               defaultProperties: [],
               description: 'Copyright information',
               properties: {
                  company: {
                     description: 'name of the company',
                     title: 'company',
                     type: 'string',
                  },
                  year: {
                     description: 'initial copyright year',
                     title: 'year',
                     type: 'number',
                  },
               },
               title: 'copyright',
               type: 'object',
            },
            menu: {
               description: 'List of menus to show in the footer',
               items: {
                  defaultProperties: [],
                  properties: {
                     items: {
                        description: 'menu link items',
                        items: {
                           defaultProperties: [],
                           properties: {
                              href: {
                                 description: 'item link',
                                 title: 'href',
                                 type: 'string',
                              },
                              target: {
                                 anyOf: [
                                    {
                                       allOf: [
                                          {
                                             properties: {},
                                             type: 'object',
                                          },
                                          {
                                             type: 'string',
                                          },
                                       ],
                                    },
                                    {
                                       enum: [
                                          '_blank',
                                          '_parent',
                                          '_self',
                                          '_top',
                                       ],
                                       type: 'string',
                                    },
                                 ],
                                 description: 'html target',
                                 title: 'target',
                              },
                              title: {
                                 description: 'Text to show for the link',
                                 title: 'title',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'items',
                        type: 'array',
                     },
                     title: {
                        description:
                           'menu group title.\nThis will be used as header for the group',
                        title: 'title',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'menu',
               type: 'array',
            },
         },
         title: 'FooterProps',
         type: 'object',
      },
      HeroProps: {
         defaultProperties: [],
         properties: {
            buttons: {
               description: 'Configuration for two the call to action buttons',
               title: 'buttons',
               defaultProperties: [],
               properties: {
                  primary: {
                     defaultProperties: [],
                     properties: {
                        action: {
                           default: 'link',
                           description: 'The type of button to display',
                           title: 'action',
                           enum: ['link', 'logo-link', 'open-video'],
                           type: 'string',
                        },
                        link: {
                           description:
                              'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                           title: 'link',
                           type: 'string',
                        },
                        logo: {
                           description:
                              'logo to display on the right side of the button\nif the button type is "logo-link"',
                           title: 'logo',
                           type: 'string',
                        },
                        text: {
                           description: 'The text to display on the button',
                           title: 'text',
                           type: 'string',
                        },
                     },
                     title: 'primary',
                     type: 'object',
                  },
                  secondary: {
                     defaultProperties: [],
                     properties: {
                        action: {
                           default: 'link',
                           description: 'The type of button to display',
                           title: 'action',
                           enum: ['link', 'logo-link', 'open-video'],
                           type: 'string',
                        },
                        link: {
                           description:
                              'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                           title: 'link',
                           type: 'string',
                        },
                        logo: {
                           description:
                              'logo to display on the right side of the button\nif the button type is "logo-link"',
                           title: 'logo',
                           type: 'string',
                        },
                        text: {
                           description: 'The text to display on the button',
                           title: 'text',
                           type: 'string',
                        },
                     },
                     title: 'secondary',
                     type: 'object',
                  },
               },
               type: 'object',
            },
            cta: {
               description: 'Call to action title',
               title: 'cta',
               type: 'string',
            },
            description: {
               description:
                  'A short description for the Hero. It will be displayed in the main\nhero section on desktop and the call to action section on mobile',
               title: 'description',
               type: 'string',
            },
            image: {
               description:
                  'Right image for the hero section, showned above the green background.\nIt should be a transparent PNG and as squared or vertical as possible.',
               title: 'image',
               type: 'string',
            },
            title: {
               description: 'Hero section title, the big text',
               title: 'title',
               type: 'string',
            },
         },
         title: 'HeroProps',
         type: 'object',
      },
      'Partial<Record<ButtonType,ButtonConfig>>': {
         defaultProperties: [],
         properties: {
            primary: {
               defaultProperties: [],
               properties: {
                  action: {
                     default: 'link',
                     description: 'The type of button to display',
                     title: 'action',
                     enum: ['link', 'logo-link', 'open-video'],
                     type: 'string',
                  },
                  link: {
                     description:
                        'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                     title: 'link',
                     type: 'string',
                  },
                  logo: {
                     description:
                        'logo to display on the right side of the button\nif the button type is "logo-link"',
                     title: 'logo',
                     type: 'string',
                  },
                  text: {
                     description: 'The text to display on the button',
                     title: 'text',
                     type: 'string',
                  },
               },
               title: 'primary',
               type: 'object',
            },
            secondary: {
               defaultProperties: [],
               properties: {
                  action: {
                     default: 'link',
                     description: 'The type of button to display',
                     title: 'action',
                     enum: ['link', 'logo-link', 'open-video'],
                     type: 'string',
                  },
                  link: {
                     description:
                        'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                     title: 'link',
                     type: 'string',
                  },
                  logo: {
                     description:
                        'logo to display on the right side of the button\nif the button type is "logo-link"',
                     title: 'logo',
                     type: 'string',
                  },
                  text: {
                     description: 'The text to display on the button',
                     title: 'text',
                     type: 'string',
                  },
               },
               title: 'secondary',
               type: 'object',
            },
         },
         title: 'Partial<Record<ButtonType,ButtonConfig>>',
         type: 'object',
      },
      'PropsMap<{hero:(props:HeroProps)=>JSX.Element;clients:({items,...itemParams}:ClientsProps)=>JSX.Element;services:({items,carousel}:ServicesProps)=>JSX.Element;team:({team}:TeamProps)=>JSX.Element;footer:({menu,copyright}:FooterProps)=>JSX.Element;},"footer"|"team"|"hero"|"services"|"clients">':
         {
            defaultProperties: [],
            description:
               'Maps an object of components to an object of their props\nwith the same keys.',
            properties: {
               clients: {
                  title: 'clients',
                  defaultProperties: [],
                  properties: {
                     grayscale: {
                        default: false,
                        description:
                           'if true a grayscale filter will be applied on not hovered items',
                        title: 'grayscale',
                        type: 'boolean',
                     },
                     items: {
                        description: 'Clients list',
                        items: {
                           defaultProperties: [],
                           properties: {
                              description: {
                                 description:
                                    'A short description of the client and what they do',
                                 title: 'description',
                                 type: 'string',
                              },
                              logo: {
                                 description: 'A logo for the client',
                                 title: 'logo',
                                 type: 'string',
                              },
                              name: {
                                 description: 'Name of the client',
                                 title: 'name',
                                 type: 'string',
                              },
                              url: {
                                 description:
                                    "The client's website, portfolio, etc. if they have one",
                                 title: 'url',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'items',
                        type: 'array',
                     },
                     withCaption: {
                        default: false,
                        description:
                           'if true the client name will be rendered as caption at the bottom',
                        title: 'withCaption',
                        type: 'boolean',
                     },
                  },
                  type: 'object',
               },
               footer: {
                  title: 'footer',
                  defaultProperties: [],
                  properties: {
                     copyright: {
                        defaultProperties: [],
                        description: 'Copyright information',
                        properties: {
                           company: {
                              description: 'name of the company',
                              title: 'company',
                              type: 'string',
                           },
                           year: {
                              description: 'initial copyright year',
                              title: 'year',
                              type: 'number',
                           },
                        },
                        title: 'copyright',
                        type: 'object',
                     },
                     menu: {
                        description: 'List of menus to show in the footer',
                        items: {
                           defaultProperties: [],
                           properties: {
                              items: {
                                 description: 'menu link items',
                                 items: {
                                    defaultProperties: [],
                                    properties: {
                                       href: {
                                          description: 'item link',
                                          title: 'href',
                                          type: 'string',
                                       },
                                       target: {
                                          anyOf: [
                                             {
                                                allOf: [
                                                   {
                                                      properties: {},
                                                      type: 'object',
                                                   },
                                                   {
                                                      type: 'string',
                                                   },
                                                ],
                                             },
                                             {
                                                enum: [
                                                   '_blank',
                                                   '_parent',
                                                   '_self',
                                                   '_top',
                                                ],
                                                type: 'string',
                                             },
                                          ],
                                          description: 'html target',
                                          title: 'target',
                                       },
                                       title: {
                                          description:
                                             'Text to show for the link',
                                          title: 'title',
                                          type: 'string',
                                       },
                                    },
                                    type: 'object',
                                 },
                                 title: 'items',
                                 type: 'array',
                              },
                              title: {
                                 description:
                                    'menu group title.\nThis will be used as header for the group',
                                 title: 'title',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'menu',
                        type: 'array',
                     },
                  },
                  type: 'object',
               },
               hero: {
                  title: 'hero',
                  defaultProperties: [],
                  properties: {
                     buttons: {
                        description:
                           'Configuration for two the call to action buttons',
                        title: 'buttons',
                        defaultProperties: [],
                        properties: {
                           primary: {
                              defaultProperties: [],
                              properties: {
                                 action: {
                                    default: 'link',
                                    description:
                                       'The type of button to display',
                                    title: 'action',
                                    enum: ['link', 'logo-link', 'open-video'],
                                    type: 'string',
                                 },
                                 link: {
                                    description:
                                       'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                                    title: 'link',
                                    type: 'string',
                                 },
                                 logo: {
                                    description:
                                       'logo to display on the right side of the button\nif the button type is "logo-link"',
                                    title: 'logo',
                                    type: 'string',
                                 },
                                 text: {
                                    description:
                                       'The text to display on the button',
                                    title: 'text',
                                    type: 'string',
                                 },
                              },
                              title: 'primary',
                              type: 'object',
                           },
                           secondary: {
                              defaultProperties: [],
                              properties: {
                                 action: {
                                    default: 'link',
                                    description:
                                       'The type of button to display',
                                    title: 'action',
                                    enum: ['link', 'logo-link', 'open-video'],
                                    type: 'string',
                                 },
                                 link: {
                                    description:
                                       'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                                    title: 'link',
                                    type: 'string',
                                 },
                                 logo: {
                                    description:
                                       'logo to display on the right side of the button\nif the button type is "logo-link"',
                                    title: 'logo',
                                    type: 'string',
                                 },
                                 text: {
                                    description:
                                       'The text to display on the button',
                                    title: 'text',
                                    type: 'string',
                                 },
                              },
                              title: 'secondary',
                              type: 'object',
                           },
                        },
                        type: 'object',
                     },
                     cta: {
                        description: 'Call to action title',
                        title: 'cta',
                        type: 'string',
                     },
                     description: {
                        description:
                           'A short description for the Hero. It will be displayed in the main\nhero section on desktop and the call to action section on mobile',
                        title: 'description',
                        type: 'string',
                     },
                     image: {
                        description:
                           'Right image for the hero section, showned above the green background.\nIt should be a transparent PNG and as squared or vertical as possible.',
                        title: 'image',
                        type: 'string',
                     },
                     title: {
                        description: 'Hero section title, the big text',
                        title: 'title',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               services: {
                  title: 'services',
                  defaultProperties: [],
                  properties: {
                     carousel: {
                        description:
                           'Whether to render a carousel or a simple grid.\nCarousel works best with 4+ items',
                        title: 'carousel',
                        type: 'boolean',
                     },
                     items: {
                        description: 'service items',
                        items: {
                           defaultProperties: [],
                           properties: {
                              description: {
                                 description:
                                    'A short description of the service',
                                 title: 'description',
                                 type: 'string',
                              },
                              filler: {
                                 defaultProperties: [],
                                 description: 'A logo for the service',
                                 properties: {
                                    type: {
                                       title: 'type',
                                       type: 'string',
                                    },
                                    url: {
                                       title: 'url',
                                       type: 'string',
                                    },
                                 },
                                 title: 'filler',
                                 type: 'object',
                              },
                              name: {
                                 description: 'Name of the service offered',
                                 title: 'name',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'items',
                        type: 'array',
                     },
                  },
                  type: 'object',
               },
               team: {
                  title: 'team',
                  defaultProperties: [],
                  properties: {
                     team: {
                        items: {
                           defaultProperties: [],
                           properties: {
                              linkedin: {
                                 description:
                                    'linkedin profile if they have one',
                                 title: 'linkedin',
                                 type: 'string',
                              },
                              name: {
                                 description: 'Name of the team member',
                                 title: 'name',
                                 type: 'string',
                              },
                              picture: {
                                 description:
                                    "URL to the team member's picture",
                                 title: 'picture',
                                 type: 'string',
                              },
                              title: {
                                 description:
                                    'What the team member does or what role they play in the team',
                                 title: 'title',
                                 type: 'string',
                              },
                              twitter: {
                                 description:
                                    'twitter profile if they have one',
                                 title: 'twitter',
                                 type: 'string',
                              },
                              website: {
                                 description:
                                    'optional website or any other link to add',
                                 title: 'website',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'team',
                        type: 'array',
                     },
                  },
                  type: 'object',
               },
            },
            title: 'PropsMap<{hero:(props:HeroProps)=>JSX.Element;clients:({items,...itemParams}:ClientsProps)=>JSX.Element;services:({items,carousel}:ServicesProps)=>JSX.Element;team:({team}:TeamProps)=>JSX.Element;footer:({menu,copyright}:FooterProps)=>JSX.Element;},"footer"|"team"|"hero"|"services"|"clients">',
            type: 'object',
         },
      ServicesProps: {
         defaultProperties: [],
         properties: {
            carousel: {
               description:
                  'Whether to render a carousel or a simple grid.\nCarousel works best with 4+ items',
               title: 'carousel',
               type: 'boolean',
            },
            items: {
               description: 'service items',
               items: {
                  defaultProperties: [],
                  properties: {
                     description: {
                        description: 'A short description of the service',
                        title: 'description',
                        type: 'string',
                     },
                     filler: {
                        defaultProperties: [],
                        description: 'A logo for the service',
                        properties: {
                           type: {
                              title: 'type',
                              type: 'string',
                           },
                           url: {
                              title: 'url',
                              type: 'string',
                           },
                        },
                        title: 'filler',
                        type: 'object',
                     },
                     name: {
                        description: 'Name of the service offered',
                        title: 'name',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'items',
               type: 'array',
            },
         },
         title: 'ServicesProps',
         type: 'object',
      },
      TeamProps: {
         defaultProperties: [],
         properties: {
            team: {
               items: {
                  defaultProperties: [],
                  properties: {
                     linkedin: {
                        description: 'linkedin profile if they have one',
                        title: 'linkedin',
                        type: 'string',
                     },
                     name: {
                        description: 'Name of the team member',
                        title: 'name',
                        type: 'string',
                     },
                     picture: {
                        description: "URL to the team member's picture",
                        title: 'picture',
                        type: 'string',
                     },
                     title: {
                        description:
                           'What the team member does or what role they play in the team',
                        title: 'title',
                        type: 'string',
                     },
                     twitter: {
                        description: 'twitter profile if they have one',
                        title: 'twitter',
                        type: 'string',
                     },
                     website: {
                        description:
                           'optional website or any other link to add',
                        title: 'website',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'team',
               type: 'array',
            },
         },
         title: 'TeamProps',
         type: 'object',
      },
      ThemeOptions: {
         defaultProperties: [],
         description: 'Available options for the theme override',
         properties: {
            primaryColor: {
               anyOf: [
                  {
                     additionalProperties: false,
                     patternProperties: {
                        '^[0-9]+$': {
                           type: 'string',
                        },
                     },
                     type: 'object',
                  },
                  {
                     enum: [
                        'blue',
                        'cyan',
                        'dark',
                        'grape',
                        'gray',
                        'green',
                        'indigo',
                        'lime',
                        'orange',
                        'pink',
                        'red',
                        'teal',
                        'violet',
                        'yellow',
                     ],
                     type: 'string',
                  },
               ],
               title: 'primaryColor',
            },
         },
         title: 'ThemeOptions',
         type: 'object',
      },
   },
   description: 'full option with mapped Components',
   properties: {
      sections: {
         description: 'Available sections for the theme',
         title: 'sections',
         defaultProperties: [],
         properties: {
            clients: {
               title: 'clients',
               defaultProperties: [],
               properties: {
                  grayscale: {
                     default: false,
                     description:
                        'if true a grayscale filter will be applied on not hovered items',
                     title: 'grayscale',
                     type: 'boolean',
                  },
                  items: {
                     description: 'Clients list',
                     items: {
                        defaultProperties: [],
                        properties: {
                           description: {
                              description:
                                 'A short description of the client and what they do',
                              title: 'description',
                              type: 'string',
                           },
                           logo: {
                              description: 'A logo for the client',
                              title: 'logo',
                              type: 'string',
                           },
                           name: {
                              description: 'Name of the client',
                              title: 'name',
                              type: 'string',
                           },
                           url: {
                              description:
                                 "The client's website, portfolio, etc. if they have one",
                              title: 'url',
                              type: 'string',
                           },
                        },
                        type: 'object',
                     },
                     title: 'items',
                     type: 'array',
                  },
                  withCaption: {
                     default: false,
                     description:
                        'if true the client name will be rendered as caption at the bottom',
                     title: 'withCaption',
                     type: 'boolean',
                  },
               },
               type: 'object',
            },
            footer: {
               title: 'footer',
               defaultProperties: [],
               properties: {
                  copyright: {
                     defaultProperties: [],
                     description: 'Copyright information',
                     properties: {
                        company: {
                           description: 'name of the company',
                           title: 'company',
                           type: 'string',
                        },
                        year: {
                           description: 'initial copyright year',
                           title: 'year',
                           type: 'number',
                        },
                     },
                     title: 'copyright',
                     type: 'object',
                  },
                  menu: {
                     description: 'List of menus to show in the footer',
                     items: {
                        defaultProperties: [],
                        properties: {
                           items: {
                              description: 'menu link items',
                              items: {
                                 defaultProperties: [],
                                 properties: {
                                    href: {
                                       description: 'item link',
                                       title: 'href',
                                       type: 'string',
                                    },
                                    target: {
                                       anyOf: [
                                          {
                                             allOf: [
                                                {
                                                   properties: {},
                                                   type: 'object',
                                                },
                                                {
                                                   type: 'string',
                                                },
                                             ],
                                          },
                                          {
                                             enum: [
                                                '_blank',
                                                '_parent',
                                                '_self',
                                                '_top',
                                             ],
                                             type: 'string',
                                          },
                                       ],
                                       description: 'html target',
                                       title: 'target',
                                    },
                                    title: {
                                       description: 'Text to show for the link',
                                       title: 'title',
                                       type: 'string',
                                    },
                                 },
                                 type: 'object',
                              },
                              title: 'items',
                              type: 'array',
                           },
                           title: {
                              description:
                                 'menu group title.\nThis will be used as header for the group',
                              title: 'title',
                              type: 'string',
                           },
                        },
                        type: 'object',
                     },
                     title: 'menu',
                     type: 'array',
                  },
               },
               type: 'object',
            },
            hero: {
               title: 'hero',
               defaultProperties: [],
               properties: {
                  buttons: {
                     description:
                        'Configuration for two the call to action buttons',
                     title: 'buttons',
                     defaultProperties: [],
                     properties: {
                        primary: {
                           defaultProperties: [],
                           properties: {
                              action: {
                                 default: 'link',
                                 description: 'The type of button to display',
                                 title: 'action',
                                 enum: ['link', 'logo-link', 'open-video'],
                                 type: 'string',
                              },
                              link: {
                                 description:
                                    'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                                 title: 'link',
                                 type: 'string',
                              },
                              logo: {
                                 description:
                                    'logo to display on the right side of the button\nif the button type is "logo-link"',
                                 title: 'logo',
                                 type: 'string',
                              },
                              text: {
                                 description:
                                    'The text to display on the button',
                                 title: 'text',
                                 type: 'string',
                              },
                           },
                           title: 'primary',
                           type: 'object',
                        },
                        secondary: {
                           defaultProperties: [],
                           properties: {
                              action: {
                                 default: 'link',
                                 description: 'The type of button to display',
                                 title: 'action',
                                 enum: ['link', 'logo-link', 'open-video'],
                                 type: 'string',
                              },
                              link: {
                                 description:
                                    'The link to open when the button is clicked\nor the video to play when the button is clicked\nif the button type is "open-video"',
                                 title: 'link',
                                 type: 'string',
                              },
                              logo: {
                                 description:
                                    'logo to display on the right side of the button\nif the button type is "logo-link"',
                                 title: 'logo',
                                 type: 'string',
                              },
                              text: {
                                 description:
                                    'The text to display on the button',
                                 title: 'text',
                                 type: 'string',
                              },
                           },
                           title: 'secondary',
                           type: 'object',
                        },
                     },
                     type: 'object',
                  },
                  cta: {
                     description: 'Call to action title',
                     title: 'cta',
                     type: 'string',
                  },
                  description: {
                     description:
                        'A short description for the Hero. It will be displayed in the main\nhero section on desktop and the call to action section on mobile',
                     title: 'description',
                     type: 'string',
                  },
                  image: {
                     description:
                        'Right image for the hero section, showned above the green background.\nIt should be a transparent PNG and as squared or vertical as possible.',
                     title: 'image',
                     type: 'string',
                  },
                  title: {
                     description: 'Hero section title, the big text',
                     title: 'title',
                     type: 'string',
                  },
               },
               type: 'object',
            },
            services: {
               title: 'services',
               defaultProperties: [],
               properties: {
                  carousel: {
                     description:
                        'Whether to render a carousel or a simple grid.\nCarousel works best with 4+ items',
                     title: 'carousel',
                     type: 'boolean',
                  },
                  items: {
                     description: 'service items',
                     items: {
                        defaultProperties: [],
                        properties: {
                           description: {
                              description: 'A short description of the service',
                              title: 'description',
                              type: 'string',
                           },
                           filler: {
                              defaultProperties: [],
                              description: 'A logo for the service',
                              properties: {
                                 type: {
                                    title: 'type',
                                    type: 'string',
                                 },
                                 url: {
                                    title: 'url',
                                    type: 'string',
                                 },
                              },
                              title: 'filler',
                              type: 'object',
                           },
                           name: {
                              description: 'Name of the service offered',
                              title: 'name',
                              type: 'string',
                           },
                        },
                        type: 'object',
                     },
                     title: 'items',
                     type: 'array',
                  },
               },
               type: 'object',
            },
            team: {
               title: 'team',
               defaultProperties: [],
               properties: {
                  team: {
                     items: {
                        defaultProperties: [],
                        properties: {
                           linkedin: {
                              description: 'linkedin profile if they have one',
                              title: 'linkedin',
                              type: 'string',
                           },
                           name: {
                              description: 'Name of the team member',
                              title: 'name',
                              type: 'string',
                           },
                           picture: {
                              description: "URL to the team member's picture",
                              title: 'picture',
                              type: 'string',
                           },
                           title: {
                              description:
                                 'What the team member does or what role they play in the team',
                              title: 'title',
                              type: 'string',
                           },
                           twitter: {
                              description: 'twitter profile if they have one',
                              title: 'twitter',
                              type: 'string',
                           },
                           website: {
                              description:
                                 'optional website or any other link to add',
                              title: 'website',
                              type: 'string',
                           },
                        },
                        type: 'object',
                     },
                     title: 'team',
                     type: 'array',
                  },
               },
               type: 'object',
            },
         },
         type: 'object',
      },
      theme: {
         description: 'User customizable theme values',
         title: 'theme',
         defaultProperties: [],
         properties: {
            primaryColor: {
               anyOf: [
                  {
                     additionalProperties: false,
                     patternProperties: {
                        '^[0-9]+$': {
                           type: 'string',
                        },
                     },
                     type: 'object',
                  },
                  {
                     enum: [
                        'blue',
                        'cyan',
                        'dark',
                        'grape',
                        'gray',
                        'green',
                        'indigo',
                        'lime',
                        'orange',
                        'pink',
                        'red',
                        'teal',
                        'violet',
                        'yellow',
                     ],
                     type: 'string',
                  },
               ],
               title: 'primaryColor',
            },
         },
         type: 'object',
      },
   },
   type: 'object',
}

export const useTemplateConfig = (
   website_url: string,
   template_name: string
) => {
   const [templateConfig, setTemplateConfig] = useState(null)
   const [initTemplate, setInitTemplate] = useState(null)
   useEffect(() => {
      getTemplateConfig()
   }, [])
   const getTemplateConfig = async () => {
      let schema = await $RefParser.dereference(
         `${website_url}/api/config/template/${template_name}`
      )
      const result = ParseSchema(schema)
      const resultinit = getInitialValue(result)
      setTemplateConfig(result)
      setInitTemplate(resultinit)
   }
   return [templateConfig, initTemplate]
}
