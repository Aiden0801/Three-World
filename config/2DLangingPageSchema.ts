import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
export const LandingPageSchema: JSONSchema = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   properties: {
      name: {
         description: 'Project Name',
         title: 'Project Name',
         type: 'string',
      },
      global: {
         description: 'Global Config',
         properties: {
            color: {
               description: 'mantine color override for the page',
               title: 'color',
               type: 'string',
            },
            description: {
               description: 'Page description',
               title: 'description',
               type: 'string',
            },
            title: {
               description: 'Page title',
               title: 'title',
               type: 'string',
            },
         },
         title: 'global',
         type: 'object',
      },
      sections: {
         description: 'Sections',
         properties: {
            clients: {
               description: 'Clients',
               items: {
                  description: 'Clients type',
                  properties: {
                     description: {
                        description: 'Description',
                        title: 'description',
                        type: 'string',
                     },
                     logo: {
                        description: 'Logo',
                        title: 'logo',
                        type: 'string',
                     },
                     name: {
                        description: 'Name',
                        title: 'name',
                        type: 'string',
                     },
                     url: {
                        description: 'URL',
                        title: 'url',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'clients',
               type: 'array',
            },
            footer: {
               description: 'Footer',
               properties: {
                  copyright: {
                     description: 'Copyright',
                     properties: {
                        company: {
                           description: 'Company',
                           title: 'company',
                           type: 'string',
                        },
                        year: {
                           description: 'Year',
                           title: 'year',
                           type: 'number',
                        },
                     },
                     title: 'copyright',
                     type: 'object',
                  },
                  menu: {
                     description: 'Menus',
                     items: {
                        properties: {
                           items: {
                              description: 'Items',
                              items: {
                                 properties: {
                                    href: {
                                       description: 'Href',
                                       title: 'href',
                                       type: 'string',
                                    },
                                    title: {
                                       description: 'Title',
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
                              description: 'Title',
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
               title: 'footer',
               type: 'object',
            },
            hero: {
               description: 'Hero',
               properties: {
                  buttons: {
                     description: 'Buttons',
                     properties: {
                        primary: {
                           description: 'Primary',
                           properties: {
                              action: {
                                 description: 'Action',
                                 title: 'action',
                                 type: 'string',
                              },
                              link: {
                                 description: 'Link',
                                 title: 'link',
                                 type: 'string',
                              },
                              text: {
                                 description: 'Label',
                                 title: 'text',
                                 type: 'string',
                              },
                           },
                           title: 'primary',
                           type: 'object',
                        },
                        secondary: {
                           description: 'Secondary',
                           properties: {
                              action: {
                                 description: 'Action',
                                 title: 'action',
                                 type: 'string',
                              },
                              link: {
                                 description: 'Link',
                                 title: 'link',
                                 type: 'string',
                              },
                              text: {
                                 description: 'Label',
                                 title: 'text',
                                 type: 'string',
                              },
                           },
                           title: 'secondary',
                           type: 'object',
                        },
                     },
                     title: 'buttons',
                     type: 'object',
                  },
                  description: {
                     description: 'Description',
                     title: 'description',
                     type: 'string',
                  },
                  image: {
                     description: 'Image URL',
                     title: 'image',
                     type: 'string',
                  },
                  title: {
                     description: 'Title',
                     title: 'title',
                     type: 'string',
                  },
               },
               title: 'hero',
               type: 'object',
            },
            services: {
               description: 'Services',
               items: {
                  properties: {
                     description: {
                        description: 'Service Description',
                        title: 'description',
                        type: 'string',
                     },
                     filler: {
                        description: 'Filler',
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
                        description: 'Service name',
                        title: 'name',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               title: 'services',
               type: 'array',
            },
            team: {
               description: 'Team',
               items: {
                  description: 'Team members type',
                  properties: {
                     linkedin: {
                        description: 'LinkedIn',
                        title: 'linkedin',
                        type: 'string',
                     },
                     name: {
                        description: 'Name',
                        title: 'name',
                        type: 'string',
                     },
                     picture: {
                        description: 'Image',
                        title: 'picture',
                        type: 'string',
                     },
                     title: {
                        description: 'Title',
                        title: 'title',
                        type: 'string',
                     },
                     twitter: {
                        description: 'Twitter',
                        title: 'twitter',
                        type: 'string',
                     },
                     website: {
                        description: 'Website',
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
         title: 'sections',
         type: 'object',
      },
   },
   type: 'object',
}
export const TwoDLandingPageSchema: JSONSchema = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   definitions: {
      FeatureSection: {
         description: 'Feature',
         properties: {
            description: {
               description: 'Description for the section',
               type: 'string',
            },
            featureCard: {
               description: 'Feature Cards',
               items: {
                  properties: {
                     description: {
                        description: 'feature description',
                        type: 'string',
                     },
                     image: {
                        description: 'url Image of Feature Image',
                        type: 'string',
                     },
                     title: {
                        description: 'feature title',
                        type: 'string',
                     },
                  },
                  type: 'object',
               },
               type: 'array',
            },
            title: {
               type: 'string',
            },
         },
         type: 'object',
      },
      HeroSection: {
         description: 'Hero',
         properties: {
            backgrondImage: {
               description: 'url of the baackground Image',
               type: 'string',
            },
            ctaTarget: {
               description: 'Cta button target',
               type: 'string',
            },
            ctaText: {
               description: 'Cta button text',
               type: 'string',
            },
            description: {
               description: 'Description for the section',
               type: 'string',
            },
            title: {
               description: 'name for the section',
               type: 'string',
            },
         },
         type: 'object',
      },
      ThemeCustomization: {
         properties: {
            colorScheme: {
               description: 'color theme',
               enum: ['dark', 'light'],
               type: 'string',
            },
            primaryColor: {
               description: 'primary Color',
               type: 'string',
            },
         },
         type: 'object',
      },
   },
   properties: {
      website: {
         description: 'website config',
         title: 'Website',
         properties: {
            description: {
               title: 'Description',
               description: 'page description',
               type: 'string',
            },
            // sections: {
            //    description: 'secions',
            //    items: {
            //       description: 'sections types',
            //       type: 'string',
            //    },
            //    type: 'array',
            // },
            title: {
               title: 'Title',
               description: 'page title',
               type: 'string',
            },
            url: {
               title: 'URL',
               description: 'deployment URL',
               type: 'string',
            },
         },
         type: 'object',
      },
      sections: {
         description: 'dynamic sections configuration',
         items: {
            anyOf: [
               {
                  title: 'HeroSection',
                  $ref: '#/definitions/HeroSection',
               },
               {
                  title: 'FeatureSection',
                  $ref: '#/definitions/FeatureSection',
               },
            ],
         },
         title: 'Section',
         type: 'array',
      },
      theme: {
         $ref: '#/definitions/ThemeCustomization',
         description: 'theme customization',
         title: 'Theme',
      },
   },
   type: 'object',
}
