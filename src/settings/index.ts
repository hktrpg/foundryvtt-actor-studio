import CompendiumSourcesSubmenu from './compendiumSourcesSubmenu';
import { MODULE_ID, LOG_PREFIX, DEFAULT_SOURCES } from '../helpers/constants';

// settings not shown on the Module Settings - not modifiable by users
export const enum PrivateSettingKeys {
  LAST_MIGRATION = 'lastMigration',
}

const enum SettingKeys {
  USE_TOKENIZER = 'useTokenizer',
  TOKEN_BAR = 'displayBarsMode',
  TOKEN_NAME = 'displayNameMode',
  SHOW_ROLLS_AS_MESSAGES = 'showRolls',
  ENABLE_ASI_ROLL = 'enableAbilityScoreRolls',
  ENABLE_ASI_POINTBUY = 'enableAbilityScorePointBuy',
  ENABLE_ASI_STANDARD = 'enableAbilityScoreStandardArray',
  ENABLE_ASI_MANUAL = 'enableAbilityScoreManualInput',
  INDIVIDUAL_PANEL_SCROLLS = 'individualScrolls',
  DEFAULT_GOLD_DICE = 'defaultGoldDice',
  FIGHTING_STYLE_STRING = 'fightingStyleLookupString',
  EQUIPMENTS_BLACKLIST = 'equipmentsBlackList',
  SUBRACES_BLACKLIST = 'subracesBlacklist',
  BUTTON_ON_DIALOG = 'buttonOnDialog',
  POINT_BUY_LIMIT = 'pointBuyLimit',
  ABILITY_ROLL_FORMULA = 'abiiltyRollFormula',
  SOURCES = 'compendiumSources',
  TRIM_SUBCLASSES = 'trimSubclasses',
}
export default SettingKeys;

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

export function registerSettings(): void {
  console.info(`${LOG_PREFIX} | Building module settings`);

  Handlebars.registerHelper('checkedIf', function (condition) {
    return condition ? 'checked' : '';
  });

  // defaultStartingGoldDice();
  // showRollsAsChatMessages();
  // individualPanelScrolls();
  // abilityScoreMethods();
  pointBuyLimit();
  // abilityRollFormula();
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
  allowManualInput();
  allowStandardArray();
  allowPointBuy();
  allowRolling();
}

function sourcesConfiguration() {
  game.settings.register(MODULE_ID, SettingKeys.SOURCES, {
    scope: 'world',
    config: false,
    type: Object,
    default: DEFAULT_SOURCES,
  });
  // Define a settings submenu which handles advanced configuration needs
  game.settings.registerMenu(MODULE_ID, SettingKeys.SOURCES, {
    name: game.i18n.localize('GAS.Setting.Sources.Name'),
    hint: game.i18n.localize('GAS.Setting.Sources.Hint'),
    label: game.i18n.localize('GAS.Setting.Sources.Label'),
    icon: 'fas fa-atlas',
    type: CompendiumSourcesSubmenu,
    restricted: true,
  });
}

function equipmentBlacklist() {
  game.settings.register(MODULE_ID, SettingKeys.EQUIPMENTS_BLACKLIST, {
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
  game.settings.register(MODULE_ID, SettingKeys.SUBRACES_BLACKLIST, {
    name: game.i18n.localize('GAS.Setting.SubraceNameBlacklist.Name'),
    hint: game.i18n.localize('GAS.Setting.SubraceNameBlacklist.Hint'),
    scope: 'world',
    config: true,
    default: 'Gnome Cunning; Halfling Nimbleness',
    type: String,
  });
}

function trimSubclasses() {
  game.settings.register(MODULE_ID, SettingKeys.TRIM_SUBCLASSES, {
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
  game.settings.register(MODULE_ID, SettingKeys.DEFAULT_GOLD_DICE, {
    name: game.i18n.localize('GAS.Setting.DefaultGoldDice.Name'),
    hint: game.i18n.localize('GAS.Setting.DefaultGoldDice.Hint'),
    scope: 'world',
    config: true,
    default: '5d4 * 10',
    type: String,
  });
}

function useTokenizerIfAvailable() {
  game.settings.register(MODULE_ID, SettingKeys.USE_TOKENIZER, {
    name: game.i18n.localize('GAS.Setting.UseTokenizer.Name'),
    hint: game.i18n.localize('GAS.Setting.UseTokenizer.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}

function buttonOnDialogInsteadOfActorsDirectory() {
  game.settings.register(MODULE_ID, SettingKeys.BUTTON_ON_DIALOG, {
    name: game.i18n.localize('GAS.Setting.ButtonOnDialogInsteadOfActorsDirectory.Name'),
    hint: game.i18n.localize('GAS.Setting.ButtonOnDialogInsteadOfActorsDirectory.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: false,
  });
}

function tokenDisplayBarsMode() {
  game.settings.register(MODULE_ID, SettingKeys.TOKEN_BAR, {
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
  game.settings.register(MODULE_ID, SettingKeys.TOKEN_NAME, {
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
  game.settings.register(MODULE_ID, SettingKeys.SHOW_ROLLS_AS_MESSAGES, {
    name: game.i18n.localize('GAS.Setting.ShowRolls.Name'),
    hint: game.i18n.localize('GAS.Setting.ShowRolls.Hint'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });
}

function individualPanelScrolls() {
  game.settings.register(MODULE_ID, SettingKeys.INDIVIDUAL_PANEL_SCROLLS, {
    name: game.i18n.localize('GAS.Setting.IndividualPanelScroll.Name'),
    hint: game.i18n.localize('GAS.Setting.IndividualPanelScroll.Hint'),
    scope: 'client',
    config: true,
    type: Boolean,
    default: false,
  });
}

function abilityScoreMethods() {
  game.settings.register(MODULE_ID, SettingKeys.ENABLE_ASI_ROLL, {
    name: game.i18n.localize('GAS.Setting.AllowAbilityRolling.Name'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, SettingKeys.ENABLE_ASI_STANDARD, {
    name: game.i18n.localize('GAS.Setting.AllowAbilityStandardArray.Name'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, SettingKeys.ENABLE_ASI_MANUAL, {
    name: game.i18n.localize('GAS.Setting.AllowAbilityInput.Name'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });

  game.settings.register(MODULE_ID, SettingKeys.ENABLE_ASI_POINTBUY, {
    name: game.i18n.localize('GAS.Setting.AllowAbilityPointBuy.Name'),
    scope: 'world',
    config: true,
    type: Boolean,
    default: true,
  });
}

function pointBuyLimit() {
  game.settings.register(MODULE_ID, SettingKeys.POINT_BUY_LIMIT, {
    name: game.i18n.localize('GAS.Setting.PointBuyLimit.Name'),
    scope: 'world',
    config: true,
    default: 27,
    type: Number,
  });
}

function abilityRollFormula() {
  game.settings.register(MODULE_ID, SettingKeys.ABILITY_ROLL_FORMULA, {
    name: game.i18n.localize('GAS.Setting.AbilityRollFormula.Name'),
    scope: 'world',
    config: true,
    default: '4d6kh3',
    type: String,
  });
}

function allowManualInput() {
  game.settings.register(MODULE_ID, 'allowManualInput', {
    name: game.i18n.localize('GAS.Setting.AbilityEntry.AllowManualInput.Name'),
    scope: 'world',
    config: true,
    default: true,
    type: Boolean,
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
    type: Boolean,
  });
}

function allowRolling() {
  game.settings.register(MODULE_ID, 'allowRolling', {
    name: game.i18n.localize('GAS.Setting.AbilityEntry.AllowRolling.Name'),
    scope: 'world',
    config: true,
    default: false,
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
