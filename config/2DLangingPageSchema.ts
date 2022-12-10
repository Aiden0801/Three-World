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
         description: 'dynamic sections configuration',
         items: {
            anyOf: [
               {
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
               {
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
               {
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
               {
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
               {
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
            ],
         },
         title: 'sections',
         type: 'array',
      },
   },
   type: 'object',
}

export const TwoDLandingPageSchema: JSONSchema = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   properties: {
      global: {
         description: 'website config',
         properties: {
            description: {
               description: 'page description',
               title: 'description',
               type: 'string',
            },
            title: {
               description: 'page title',
               title: 'title',
               type: 'string',
            },
            url: {
               description: 'deployment URL',
               title: 'url',
               type: 'string',
            },
         },
         title: 'website',
         type: 'object',
      },
      sections: {
         description: 'dynamic sections configuration',
         items: {
            anyOf: [
               {
                  properties: {
                     backgrondImage: {
                        description: 'url of the baackground Image',
                        title: 'backgrondImage',
                        type: 'string',
                     },
                     ctaTarget: {
                        description: 'Cta button target',
                        title: 'ctaTarget',
                        type: 'string',
                     },
                     ctaText: {
                        title: 'ctaText',
                        type: 'string',
                     },
                     description: {
                        description: 'Description for the section',
                        title: 'description',
                        type: 'string',
                     },
                     title: {
                        description: 'name for the section',
                        title: 'title',
                        type: 'string',
                     },
                  },
                  description: 'HeroSection',
                  title: 'Hero',
                  type: 'object',
               },
               {
                  description: 'FeatureSection',
                  properties: {
                     description: {
                        title: 'description',
                        type: 'string',
                     },
                     featureCard: {
                        description: 'Feature Cards',
                        items: {
                           properties: {
                              description: {
                                 description: 'feature description',
                                 title: 'description',
                                 type: 'string',
                              },
                              image: {
                                 description: 'url Image of Feature Image',
                                 title: 'image',
                                 type: 'string',
                              },
                              title: {
                                 description: 'feature title',
                                 title: 'title',
                                 type: 'string',
                              },
                           },
                           type: 'object',
                        },
                        title: 'featureCard',
                        type: 'array',
                     },
                     title: {
                        title: 'title',
                        type: 'string',
                     },
                  },
                  title: 'Feature',
                  type: 'object',
               },
            ],
         },
         title: 'sections',
         type: 'array',
      },
   },
   type: 'object',
}
