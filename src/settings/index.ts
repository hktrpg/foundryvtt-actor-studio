import CompendiumSourcesSubmenu from './compendiumSourcesSubmenu';
import { MODULE_ID, LOG_PREFIX, DEFAULT_SOURCES } from '../helpers/constants';

// settings not shown on the Module Settings - not modifiable by users
export const enum PrivateSettingKeys {
  LAST_MIGRATION = 'lastMigration',
}

export const enum SourceType {
  RACES = 'races',
  RACIAL_FEATURES = 'racialFeatures',
  CLASSES = 'classes',
  CLASS_FEATURES = 'classFeatures',
  SUBCLASSES = 'subclasses',
  BACKGROUNDS = 'backgrounds',
  SPELLS = 'spells',
  FEATS = 'feats',
  ITEMS = 'items',
}

export type Source = {
  [key in SourceType]: any;
};

export function registerSettings(app): void {
  console.info(`${LOG_PREFIX} | Building module settings`);

  Handlebars.registerHelper('checkedIf', function (condition) {
    return condition ? 'checked' : '';
  });

  // defaultStartingGoldDice();
  // showRollsAsChatMessages();
  // individualPanelScrolls();
  // tokenDisplayNameMode();
  // tokenDisplayBarsMode();
  // equipmentBlacklist();
  // subraceNameBlacklist();
  // buttonOnDialogInsteadOfActorsDirectory();
  // trimSubclasses();
  // custom packs
  sourcesConfiguration();
  // integrations
  // useTokenizerIfAvailable();
  // private settings
  // lastMigration();
  dontShowWelcome();
  // abilityScoreMethods();

  allowManualInput();
  allowStandardArray();
  allowPointBuy();
  pointBuyLimit();
  allowRolling(app);
  abilityRollFormula();

}

function sourcesConfiguration() {
  game.settings.register(MODULE_ID, 'compendiumSources', {
    scope: 'world',
    config: false,
    type: Object,
    default: DEFAULT_SOURCES,
  });
  // Define a settings submenu which handles advanced configuration needs
  game.settings.registerMenu(MODULE_ID, 'compendiumSources', {
    name: game.i18n.localize('GAS.Setting.Sources.Name'),
    hint: game.i18n.localize('GAS.Setting.Sources.Hint'),
    label: game.i18n.localize('GAS.Setting.Sources.Label'),
    icon: 'fas fa-atlas',
    type: CompendiumSourcesSubmenu,
    restricted: true,
  });
}

function equipmentBlacklist() {
  game.settings.register(MODULE_ID, 'equipmentsBlackList', {
    name: game.i18n.localize('GAS.Setting.EquipmentBlacklist.Name'),
    hint: game.i18n.localize('GAS.Setting.EquipmentBlacklist.Hint'),
    scope: 'world',
    config: true,
    default:
      'Potion of Climbing; Potion of Healing; Spell Scroll 1st Level; Spell Scroll Cantrip Level; Unarmed Strike',
    type: String,
  });
}

function subraceNameBlacklist() {
  game.settings.register(MODULE_ID, 'subracesBlacklist', {
    name: game.i18n.localize('GAS.Setting.SubraceNameBlacklist.Name'),
    hint: game.i18n.localize('GAS.Setting.SubraceNameBlacklist.Hint'),
    scope: 'world',
    config: true,
    default: 'Gnome Cunning; Halfling Nimbleness',
    type: String,
  });
}

function trimSubclasses() {
  game.settings.register(MODULE_ID, 'trimSubclasses', {
    name: game.i18n.localize('GAS.Setting.TrimSubclasses.Name'),
    hint: game.i18n.localize('GAS.Setting.TrimSubclasses.Hint'),
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
  });
}
function dontShowWelcome() {
  game.settings.register(MODULE_ID, 'dontShowWelcome', {
    name: game.i18n.localize('GAS.Setting.DontShowWelcome.Name'),
    hint: game.i18n.localize('GAS.Setting.DontShowWelcome.Hint'),
    scope: 'user',
    config: true,
    default: false,
    type: Boolean,
  });
}

function defaultStartingGoldDice() {
  game.settings.register(MODULE_ID, 'defaultGoldDice', {
    name: game.i18n.localize('GAS.Setting.DefaultGoldDice.Name'),
    hint: game.i18n.localize('GAS.Setting.DefaultGoldDice.Hint'),
    scope: 'world',
    config: true,
    default: '5d4 * 10',
    type: String,
  });
}

function useTokenizerIfAvailable() {
  game.settings.register(MODULE_ID, 'useTokenizer', {
    name: game.i18n.localize('GAS.Setting.UseTokenizer.Name'),
    hint: game.i18n.localize('GAS.Setting.UseTokenizer.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}

function buttonOnDialogInsteadOfActorsDirectory() {
  game.settings.register(MODULE_ID, 'buttonOnDialog', {
    name: game.i18n.localize('GAS.Setting.ButtonOnDialogInsteadOfActorsDirectory.Name'),
    hint: game.i18n.localize('GAS.Setting.ButtonOnDialogInsteadOfActorsDirectory.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}

function tokenDisplayBarsMode() {
  game.settings.register(MODULE_ID, 'displayBarsMode', {
    name: game.i18n.localize('GAS.Setting.TokenBarMode.Name'),
    scope: 'world',
    config: true,
    type: Number,
    choices: {
      0: 'Never Displayed',
      10: 'When Controlled',
      20: 'Hover by Owner',
      30: 'Hover by Anyone',
      40: 'Always for Owner',
      50: 'Always for Anyone',
    },
    default: 20,
  });
}

function tokenDisplayNameMode() {
  game.settings.register(MODULE_ID, 'displayNameMode', {
    name: game.i18n.localize('GAS.Setting.TokenNameMode.Name'),
    scope: 'world',
    config: true,
    type: Number,
    choices: {
      0: 'Never Displayed',
      10: 'When Controlled',
      20: 'Hover by Owner',
      30: 'Hover by Anyone',
      40: 'Always for Owner',
      50: 'Always for Anyone',
    },
    default: 20,
  });
}

function showRollsAsChatMessages() {
  game.settings.register(MODULE_ID, 'showRolls', {
    name: game.i18n.localize('GAS.Setting.ShowRolls.Name'),
    hint: game.i18n.localize('GAS.Setting.ShowRolls.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });
}

function individualPanelScrolls() {
  game.settings.register(MODULE_ID, 'individualScrolls', {
    name: game.i18n.localize('GAS.Setting.IndividualPanelScroll.Name'),
    hint: game.i18n.localize('GAS.Setting.IndividualPanelScroll.Hint'),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });
}


function pointBuyLimit() {
  game.settings.register(MODULE_ID, 'pointBuyLimit', {
    name: game.i18n.localize('GAS.Setting.PointBuyLimit.Name'),
    scope: 'world',
    config: true,
    default: 27,
    type: Number,
  });
}

function abilityRollFormula() {
  game.settings.register(MODULE_ID, 'abiiltyRollFormula', {
    name: game.i18n.localize('GAS.Setting.AbilityRollFormula.Name'),
    scope: 'world',
    config: true,
    default: '4d6kh3',
    type: String,
    onChange: () => { console.log('allowPointBuy')},
    updateSetting: () => { console.log('updateSetting'); },
  });
}



function allowManualInput() {
  game.settings.register(MODULE_ID, 'allowManualInput', {
    name: game.i18n.localize('GAS.Setting.AllowAbilityRolling.Name'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });
}

function allowStandardArray() {
  game.settings.register(MODULE_ID, 'allowStandardArray', {
    name: game.i18n.localize('GAS.Setting.AbilityEntry.AllowStandardArray.Name'),
    scope: 'world',
    config: true,
    default: false,
    type: Boolean,
  });
}

function allowPointBuy() {
  game.settings.register(MODULE_ID, 'allowPointBuy', {
    name: game.i18n.localize('GAS.Setting.AbilityEntry.AllowPointBuy.Name'),
    scope: 'world',
    config: true,
    default: false,
    onChange: () => { console.log('allowPointBuy')},
    updateSetting: () => { console.log('updateSetting'); },
    type: Boolean,
  });
}

function allowRolling(app) {
  game.settings.register(MODULE_ID, 'allowRolling', {
    name: game.i18n.localize('GAS.Setting.AbilityEntry.AllowRolling.Name'),
    scope: 'world',
    config: true,
    default: false,
    onChange: () => { console.log('allowPointBuy')},
    updateSetting: () => { console.log('updateSetting'); },
    type: Boolean,
  });
}

// PRIVATE SETTINGS

function lastMigration() {
  game.settings.register(MODULE_ID, PrivateSettingKeys.LAST_MIGRATION, {
    scope: 'world',
    config: false,
    default: 0,
    type: Number,
  });
}
