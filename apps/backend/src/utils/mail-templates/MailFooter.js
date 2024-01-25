"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.MailFooter = void 0;
var theme_config_1 = __importDefault(require("../../../theme.config"));
var MailFooter = function () {
    // year from today date
    var year = new Date().getFullYear();
    // theme colors
    var site_name = theme_config_1["default"].site_name, site_link = theme_config_1["default"].site_link, footer_bg = theme_config_1["default"].footer_bg, footer_text = theme_config_1["default"].footer_text, footer_menus = theme_config_1["default"].footer_menus;
    return "<!-- Footer -->\n        <tr>\n            <td style=\"background-color: ".concat(footer_bg, "; padding: 14px 40px;\">\n                <table width=\"100%\">\n                    <tr>\n                        <td class=\"footer-columns\" style=\" display: flex; align-items: center;\">\n                            <table class=\"column\">\n                                <tr>\n                                    <td class=\"copyright\">\n                                        <p style=\"font-size: 14px; font-weight: 400; color: ").concat(footer_text, ";\">\n                                            \u00A9 ").concat(year, " ").concat(site_name, "\n                                        </p>\n                                    </td>\n                                </tr>\n                            </table>\n                            <table class=\"column\">\n                                <tr style=\"display: table-cell;\">\n                                    <td class=\"social\" style=\"display: flex; align-items: center;\">\n                                        ").concat(footer_menus.map(function (menu) { return ("<a href=".concat(menu.link, " target=\"_blank\"\n                                           style=\"font-size: 14px; color:").concat(footer_text, "; display: inline-block;  display: flex; align-items: center; justify-content: center; margin-left: 18px;\">\n                                            ").concat(menu.name, "\n                                        </a>")); }), "\n                                    </td>\n                                </tr>\n                            </table>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n\n    </table>\n</center>\n</body>\n\n</html>");
};
exports.MailFooter = MailFooter;
