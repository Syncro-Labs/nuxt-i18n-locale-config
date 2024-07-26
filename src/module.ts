import {
  addTemplate,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
  hasNuxtModule,
  updateTemplates
} from "@nuxt/kit";
// import type { ModuleHooks } from "@nuxtjs/i18n";
import { addImports } from "@nuxt/kit";
import defu from "defu";
import { isAbsolute, join, relative } from "pathe";
import { codegenI18nFormat, codegenI18nTypes } from "./codegen";
import { GetLocales } from "./utils/handler";

export interface ModuleOptions {
  localeDirs: string[];
  definitionName: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@syncronet/i18n",
    configKey: "syncronetI18n",
  },
  // Default configuration options of the Nuxt module
  defaults: {
    localeDirs: [],
    definitionName: "definition.ts",
  },
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url);
    // const logger = useLogger("@syncronet/i18n");

    if (!hasNuxtModule("@nuxtjs/i18n")) {
    }

    if (_options.localeDirs.length < 1) {
      _options.localeDirs.push("./locale");
    }

    addImports({
      name: "defineLocale",
      as: "defineLocale",
      from: resolver.resolve("./runtime/composables/defineLocale"),
    });

    addTypeTemplate({
      filename: "types/syncronet-i18n.d.ts",
      getContents: codegenI18nTypes,
      options: _options,
    });

    addTemplate({
      filename: "i18n/datetimeFormats.json",
      getContents: codegenI18nFormat,
      options: defu(_options, { kind: "datetimeFormats" as const }),
      write: true,
    });

    addTemplate({
      filename: "i18n/numberFormats.json",
      getContents: codegenI18nFormat,
      options: defu(_options, { kind: "numberFormats" as const }),
      write: true,
    });

    function isSubDir(parent: string, dir: string) {
      const _relative = relative(parent, dir);
      return _relative && !_relative.startsWith("..") && !isAbsolute(_relative);
    }

    _nuxt.hook("builder:watch", async (event, path) => {
      if (!isAbsolute(path)) {
        const joined = join(_nuxt.options.srcDir, path);

        if (_options.localeDirs.some((dir) => isSubDir(dir, joined))) {
          updateTemplates({
            filter: (t) =>
              t.filename === "i18n/datetimeFormats.json" ||
              t.filename === "i18n/numberFormats.json" ||
              t.filename === "types/syncronet-i18n.d.ts",
          });
          // }
        }
      }
    });

    // @ts-ignore
    _nuxt.hook("i18n:registerModule", async (register) => {
      try {
        const locales = await GetLocales(_nuxt, _options);

        const registering = locales.map((locale) => locale.locale);

        register({
          langDir: resolver.resolve("./runtime/locale/"),
          // @ts-ignore
          locales: registering,
        });
      } catch (error) {
        console.error(error);
      }
    });
  },
});
