const { Keystone } = require('@keystonejs/keystone');
const { Relationship, Slug, Text } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');

const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { NuxtApp } = require('@keystonejs/app-nuxt');

const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const PROJECT_NAME = 'ata';
const adapterConfig = { knexOptions: { connection: 'postgres://ata:ata@localhost/ata' } };


const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do' },
  },
});

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text },
  },
});

keystone.createList('Category', {
  schemaDoc: 'Categories',
  fields: {
    name: { type: Text, isRequired: true },
    slug: { type: Slug, isRequired: true },
    description: { type: Text },
  },
});

keystone.createList('Article', {
  fields: {
    title: { type: Text, isRequired: true },
    slug: { type: Slug, isRequired: true },
    content: { type: Wysiwyg },
    category: { type: Relationship, ref: 'Category', many: false }
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: PROJECT_NAME }),
    new NuxtApp({
      srcDir: 'src',
      buildDir: 'dist',
    }),
  ],
};
