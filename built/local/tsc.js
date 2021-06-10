var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register("lib/record", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("lib/field-stringifier", [], function (exports_2, context_2) {
    "use strict";
    var DEFAULT_FIELD_DELIMITER, VALID_FIELD_DELIMITERS, FieldStringifier, DefaultFieldStringifier, ForceQuoteFieldStringifier;
    var __moduleName = context_2 && context_2.id;
    function createFieldStringifier(fieldDelimiter, alwaysQuote) {
        if (fieldDelimiter === void 0) { fieldDelimiter = DEFAULT_FIELD_DELIMITER; }
        if (alwaysQuote === void 0) { alwaysQuote = false; }
        _validateFieldDelimiter(fieldDelimiter);
        return alwaysQuote ? new ForceQuoteFieldStringifier(fieldDelimiter) : new DefaultFieldStringifier(fieldDelimiter);
    }
    exports_2("createFieldStringifier", createFieldStringifier);
    function _validateFieldDelimiter(delimiter) {
        if (VALID_FIELD_DELIMITERS.indexOf(delimiter) === -1) {
            throw new Error("Invalid field delimiter `" + delimiter + "` is specified");
        }
    }
    return {
        setters: [],
        execute: function () {
            DEFAULT_FIELD_DELIMITER = ',';
            VALID_FIELD_DELIMITERS = [DEFAULT_FIELD_DELIMITER, ';'];
            FieldStringifier = (function () {
                function FieldStringifier(fieldDelimiter) {
                    this.fieldDelimiter = fieldDelimiter;
                }
                FieldStringifier.prototype.isEmpty = function (value) {
                    return typeof value === 'undefined' || value === null || value === '';
                };
                FieldStringifier.prototype.quoteField = function (field) {
                    return "\"" + field.replace(/"/g, '""') + "\"";
                };
                return FieldStringifier;
            }());
            exports_2("FieldStringifier", FieldStringifier);
            DefaultFieldStringifier = (function (_super) {
                __extends(DefaultFieldStringifier, _super);
                function DefaultFieldStringifier() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DefaultFieldStringifier.prototype.stringify = function (value) {
                    if (this.isEmpty(value))
                        return '';
                    var str = String(value);
                    return this.needsQuote(str) ? this.quoteField(str) : str;
                };
                DefaultFieldStringifier.prototype.needsQuote = function (str) {
                    return str.includes(this.fieldDelimiter) || str.includes('\n') || str.includes('"');
                };
                return DefaultFieldStringifier;
            }(FieldStringifier));
            ForceQuoteFieldStringifier = (function (_super) {
                __extends(ForceQuoteFieldStringifier, _super);
                function ForceQuoteFieldStringifier() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ForceQuoteFieldStringifier.prototype.stringify = function (value) {
                    return this.isEmpty(value) ? '' : this.quoteField(String(value));
                };
                return ForceQuoteFieldStringifier;
            }(FieldStringifier));
        }
    };
});
System.register("lib/csv-stringifiers/abstract", [], function (exports_3, context_3) {
    "use strict";
    var DEFAULT_RECORD_DELIMITER, VALID_RECORD_DELIMITERS, CsvStringifier;
    var __moduleName = context_3 && context_3.id;
    function _validateRecordDelimiter(delimiter) {
        if (VALID_RECORD_DELIMITERS.indexOf(delimiter) === -1) {
            throw new Error("Invalid record delimiter `" + delimiter + "` is specified");
        }
    }
    return {
        setters: [],
        execute: function () {
            DEFAULT_RECORD_DELIMITER = '\n';
            VALID_RECORD_DELIMITERS = [DEFAULT_RECORD_DELIMITER, '\r\n'];
            CsvStringifier = (function () {
                function CsvStringifier(fieldStringifier, recordDelimiter) {
                    if (recordDelimiter === void 0) { recordDelimiter = DEFAULT_RECORD_DELIMITER; }
                    this.fieldStringifier = fieldStringifier;
                    this.recordDelimiter = recordDelimiter;
                    _validateRecordDelimiter(recordDelimiter);
                }
                CsvStringifier.prototype.getHeaderString = function () {
                    var headerRecord = this.getHeaderRecord();
                    return headerRecord ? this.joinRecords([this.getCsvLine(headerRecord)]) : null;
                };
                CsvStringifier.prototype.stringifyRecords = function (records) {
                    var _this = this;
                    var csvLines = Array.from(records, function (record) { return _this.getCsvLine(_this.getRecordAsArray(record)); });
                    return this.joinRecords(csvLines);
                };
                CsvStringifier.prototype.getCsvLine = function (record) {
                    var _this = this;
                    return record
                        .map(function (fieldValue) { return _this.fieldStringifier.stringify(fieldValue); })
                        .join(this.fieldStringifier.fieldDelimiter);
                };
                CsvStringifier.prototype.joinRecords = function (records) {
                    return records.join(this.recordDelimiter) + this.recordDelimiter;
                };
                return CsvStringifier;
            }());
            exports_3("CsvStringifier", CsvStringifier);
        }
    };
});
System.register("lib/csv-stringifiers/array", ["lib/csv-stringifiers/abstract"], function (exports_4, context_4) {
    "use strict";
    var abstract_1, ArrayCsvStringifier;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (abstract_1_1) {
                abstract_1 = abstract_1_1;
            }
        ],
        execute: function () {
            ArrayCsvStringifier = (function (_super) {
                __extends(ArrayCsvStringifier, _super);
                function ArrayCsvStringifier(fieldStringifier, recordDelimiter, header) {
                    var _this = _super.call(this, fieldStringifier, recordDelimiter) || this;
                    _this.header = header;
                    return _this;
                }
                ArrayCsvStringifier.prototype.getHeaderRecord = function () {
                    return this.header;
                };
                ArrayCsvStringifier.prototype.getRecordAsArray = function (record) {
                    return record;
                };
                return ArrayCsvStringifier;
            }(abstract_1.CsvStringifier));
            exports_4("ArrayCsvStringifier", ArrayCsvStringifier);
        }
    };
});
System.register("lib/lang/object", [], function (exports_5, context_5) {
    "use strict";
    var isObject;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            exports_5("isObject", isObject = function (value) {
                return Object.prototype.toString.call(value) === '[object Object]';
            });
        }
    };
});
System.register("lib/csv-stringifiers/object", ["lib/csv-stringifiers/abstract", "lib/lang/object"], function (exports_6, context_6) {
    "use strict";
    var abstract_2, object_1, ObjectCsvStringifier;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (abstract_2_1) {
                abstract_2 = abstract_2_1;
            },
            function (object_1_1) {
                object_1 = object_1_1;
            }
        ],
        execute: function () {
            ObjectCsvStringifier = (function (_super) {
                __extends(ObjectCsvStringifier, _super);
                function ObjectCsvStringifier(fieldStringifier, header, recordDelimiter, headerIdDelimiter) {
                    var _this = _super.call(this, fieldStringifier, recordDelimiter) || this;
                    _this.header = header;
                    _this.headerIdDelimiter = headerIdDelimiter;
                    return _this;
                }
                ObjectCsvStringifier.prototype.getHeaderRecord = function () {
                    if (!this.isObjectHeader)
                        return null;
                    return this.header.map(function (field) { return field.title; });
                };
                ObjectCsvStringifier.prototype.getRecordAsArray = function (record) {
                    var _this = this;
                    return this.fieldIds.map(function (fieldId) { return _this.getNestedValue(record, fieldId); });
                };
                ObjectCsvStringifier.prototype.getNestedValue = function (obj, key) {
                    if (!this.headerIdDelimiter)
                        return obj[key];
                    return key.split(this.headerIdDelimiter).reduce(function (subObj, keyPart) { return (subObj || {})[keyPart]; }, obj);
                };
                Object.defineProperty(ObjectCsvStringifier.prototype, "fieldIds", {
                    get: function () {
                        return this.isObjectHeader ? this.header.map(function (column) { return column.id; }) : this.header;
                    },
                    enumerable: false,
                    configurable: true
                });
                Object.defineProperty(ObjectCsvStringifier.prototype, "isObjectHeader", {
                    get: function () {
                        return object_1.isObject(this.header && this.header[0]);
                    },
                    enumerable: false,
                    configurable: true
                });
                return ObjectCsvStringifier;
            }(abstract_2.CsvStringifier));
            exports_6("ObjectCsvStringifier", ObjectCsvStringifier);
        }
    };
});
System.register("lib/csv-stringifier-factory", ["lib/csv-stringifiers/array", "lib/field-stringifier", "lib/csv-stringifiers/object"], function (exports_7, context_7) {
    "use strict";
    var array_1, field_stringifier_1, object_2, CsvStringifierFactory;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (array_1_1) {
                array_1 = array_1_1;
            },
            function (field_stringifier_1_1) {
                field_stringifier_1 = field_stringifier_1_1;
            },
            function (object_2_1) {
                object_2 = object_2_1;
            }
        ],
        execute: function () {
            CsvStringifierFactory = (function () {
                function CsvStringifierFactory() {
                }
                CsvStringifierFactory.prototype.createArrayCsvStringifier = function (params) {
                    var fieldStringifier = field_stringifier_1.createFieldStringifier(params.fieldDelimiter, params.alwaysQuote);
                    return new array_1.ArrayCsvStringifier(fieldStringifier, params.recordDelimiter, params.header);
                };
                CsvStringifierFactory.prototype.createObjectCsvStringifier = function (params) {
                    var fieldStringifier = field_stringifier_1.createFieldStringifier(params.fieldDelimiter, params.alwaysQuote);
                    return new object_2.ObjectCsvStringifier(fieldStringifier, params.header, params.recordDelimiter, params.headerIdDelimiter);
                };
                return CsvStringifierFactory;
            }());
            exports_7("CsvStringifierFactory", CsvStringifierFactory);
        }
    };
});
System.register("lib/lang/promise", [], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function promisify(fn) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                var nodeCallback = function (err, result) {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                };
                fn.apply(null, __spreadArrays(args, [nodeCallback]));
            });
        };
    }
    exports_8("promisify", promisify);
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("lib/file-writer", ["lib/lang/promise", "fs"], function (exports_9, context_9) {
    "use strict";
    var promise_1, fs_1, writeFilePromise, DEFAULT_ENCODING, FileWriter;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (promise_1_1) {
                promise_1 = promise_1_1;
            },
            function (fs_1_1) {
                fs_1 = fs_1_1;
            }
        ],
        execute: function () {
            writeFilePromise = promise_1.promisify(fs_1.writeFile);
            DEFAULT_ENCODING = 'utf8';
            FileWriter = (function () {
                function FileWriter(path, append, encoding) {
                    if (encoding === void 0) { encoding = DEFAULT_ENCODING; }
                    this.path = path;
                    this.append = append;
                    this.encoding = encoding;
                }
                FileWriter.prototype.write = function (string) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writeFilePromise(this.path, string, this.getWriteOption())];
                                case 1:
                                    _a.sent();
                                    this.append = true;
                                    return [2];
                            }
                        });
                    });
                };
                FileWriter.prototype.getWriteOption = function () {
                    return {
                        encoding: this.encoding,
                        flag: this.append ? 'a' : 'w'
                    };
                };
                return FileWriter;
            }());
            exports_9("FileWriter", FileWriter);
        }
    };
});
System.register("lib/csv-writer", ["lib/file-writer"], function (exports_10, context_10) {
    "use strict";
    var file_writer_1, DEFAULT_INITIAL_APPEND_FLAG, CsvWriter;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (file_writer_1_1) {
                file_writer_1 = file_writer_1_1;
            }
        ],
        execute: function () {
            DEFAULT_INITIAL_APPEND_FLAG = false;
            CsvWriter = (function () {
                function CsvWriter(csvStringifier, path, encoding, append) {
                    if (append === void 0) { append = DEFAULT_INITIAL_APPEND_FLAG; }
                    this.csvStringifier = csvStringifier;
                    this.append = append;
                    this.fileWriter = new file_writer_1.FileWriter(path, this.append, encoding);
                }
                CsvWriter.prototype.writeRecords = function (records) {
                    return __awaiter(this, void 0, void 0, function () {
                        var recordsString, writeString;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    recordsString = this.csvStringifier.stringifyRecords(records);
                                    writeString = this.headerString + recordsString + "hieu";
                                    return [4, this.fileWriter.write(writeString)];
                                case 1:
                                    _a.sent();
                                    this.append = true;
                                    return [2];
                            }
                        });
                    });
                };
                Object.defineProperty(CsvWriter.prototype, "headerString", {
                    get: function () {
                        var headerString = !this.append && this.csvStringifier.getHeaderString();
                        return headerString || '';
                    },
                    enumerable: false,
                    configurable: true
                });
                return CsvWriter;
            }());
            exports_10("CsvWriter", CsvWriter);
        }
    };
});
System.register("lib/csv-writer-factory", ["lib/csv-writer"], function (exports_11, context_11) {
    "use strict";
    var csv_writer_1, CsvWriterFactory;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (csv_writer_1_1) {
                csv_writer_1 = csv_writer_1_1;
            }
        ],
        execute: function () {
            CsvWriterFactory = (function () {
                function CsvWriterFactory(csvStringifierFactory) {
                    this.csvStringifierFactory = csvStringifierFactory;
                }
                CsvWriterFactory.prototype.createArrayCsvWriter = function (params) {
                    var csvStringifier = this.csvStringifierFactory.createArrayCsvStringifier({
                        header: params.header,
                        fieldDelimiter: params.fieldDelimiter,
                        recordDelimiter: params.recordDelimiter,
                        alwaysQuote: params.alwaysQuote
                    });
                    return new csv_writer_1.CsvWriter(csvStringifier, params.path, params.encoding, params.append);
                };
                CsvWriterFactory.prototype.createObjectCsvWriter = function (params) {
                    var csvStringifier = this.csvStringifierFactory.createObjectCsvStringifier({
                        header: params.header,
                        fieldDelimiter: params.fieldDelimiter,
                        recordDelimiter: params.recordDelimiter,
                        headerIdDelimiter: params.headerIdDelimiter,
                        alwaysQuote: params.alwaysQuote
                    });
                    return new csv_writer_1.CsvWriter(csvStringifier, params.path, params.encoding, params.append);
                };
                return CsvWriterFactory;
            }());
            exports_11("CsvWriterFactory", CsvWriterFactory);
        }
    };
});
System.register("index", ["lib/csv-stringifier-factory", "lib/csv-writer-factory"], function (exports_12, context_12) {
    "use strict";
    var csv_stringifier_factory_1, csv_writer_factory_1, csvStringifierFactory, csvWriterFactory, createArrayCsvStringifier, createObjectCsvStringifier, createArrayCsvWriter, createObjectCsvWriter;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (csv_stringifier_factory_1_1) {
                csv_stringifier_factory_1 = csv_stringifier_factory_1_1;
            },
            function (csv_writer_factory_1_1) {
                csv_writer_factory_1 = csv_writer_factory_1_1;
            }
        ],
        execute: function () {
            csvStringifierFactory = new csv_stringifier_factory_1.CsvStringifierFactory();
            csvWriterFactory = new csv_writer_factory_1.CsvWriterFactory(csvStringifierFactory);
            exports_12("createArrayCsvStringifier", createArrayCsvStringifier = function (params) {
                return csvStringifierFactory.createArrayCsvStringifier(params);
            });
            exports_12("createObjectCsvStringifier", createObjectCsvStringifier = function (params) {
                return csvStringifierFactory.createObjectCsvStringifier(params);
            });
            exports_12("createArrayCsvWriter", createArrayCsvWriter = function (params) {
                return csvWriterFactory.createArrayCsvWriter(params);
            });
            exports_12("createObjectCsvWriter", createObjectCsvWriter = function (params) {
                return csvWriterFactory.createObjectCsvWriter(params);
            });
        }
    };
});
System.register("test/helper/delimiter", [], function (exports_13, context_13) {
    "use strict";
    var resolveDelimiterChar;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [],
        execute: function () {
            exports_13("resolveDelimiterChar", resolveDelimiterChar = function (char) {
                if (char === ',' || char === ';')
                    return char;
                if (typeof char === 'undefined')
                    return ',';
                throw new Error('Invalid field delimiter');
            });
        }
    };
});
System.register("test/field-stringifier.test", ["test/helper/delimiter", "lib/field-stringifier", "assert"], function (exports_14, context_14) {
    "use strict";
    var delimiter_1, field_stringifier_2, assert_1;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (delimiter_1_1) {
                delimiter_1 = delimiter_1_1;
            },
            function (field_stringifier_2_1) {
                field_stringifier_2 = field_stringifier_2_1;
            },
            function (assert_1_1) {
                assert_1 = assert_1_1;
            }
        ],
        execute: function () {
            describe('DefaultFieldStringifier', function () {
                describe('When field delimiter is comma', generateTestCases(','));
                describe('When field delimiter is semicolon', generateTestCases(';'));
                describe('When all fields needs to be quoted', function () {
                    var stringifier = field_stringifier_2.createFieldStringifier(',', true);
                    it('quotes a field', function () {
                        assert_1.strictEqual(stringifier.stringify('VALUE'), '"VALUE"');
                    });
                    it('does not quote a field of value undefined', function () {
                        assert_1.strictEqual(stringifier.stringify(), '');
                    });
                    it('does not quote a field of value null', function () {
                        assert_1.strictEqual(stringifier.stringify(null), '');
                    });
                    it('does not quote a field of value empty string', function () {
                        assert_1.strictEqual(stringifier.stringify(''), '');
                    });
                });
                function generateTestCases(fieldDelimiter) {
                    var delim = delimiter_1.resolveDelimiterChar(fieldDelimiter);
                    return function () {
                        var stringifier = field_stringifier_2.createFieldStringifier(fieldDelimiter);
                        it('returns the same string', function () {
                            assert_1.strictEqual(stringifier.stringify('VALUE'), 'VALUE');
                        });
                        it('preserves the whitespace characters', function () {
                            assert_1.strictEqual(stringifier.stringify(' VALUE\tA  '), ' VALUE\tA  ');
                        });
                        it("wraps a field value with double quotes if the field contains \"" + delim + "\"", function () {
                            assert_1.strictEqual(stringifier.stringify("VALUE" + delim + "A"), "\"VALUE" + delim + "A\"");
                        });
                        it('wraps a field value with double quotes if the field contains newline', function () {
                            assert_1.strictEqual(stringifier.stringify('VALUE\nA'), '"VALUE\nA"');
                        });
                        it('wraps a field value with double quotes and escape the double quotes if they are used in the field', function () {
                            assert_1.strictEqual(stringifier.stringify('VALUE"A'), '"VALUE""A"');
                        });
                        it('escapes double quotes even if double quotes are only on the both edges of the field', function () {
                            assert_1.strictEqual(stringifier.stringify('"VALUE"'), '"""VALUE"""');
                        });
                        it('converts a number into a string', function () {
                            assert_1.strictEqual(stringifier.stringify(1), '1');
                        });
                        it('converts undefined into an empty string', function () {
                            assert_1.strictEqual(stringifier.stringify(), '');
                        });
                        it('converts null into an empty string', function () {
                            assert_1.strictEqual(stringifier.stringify(null), '');
                        });
                        it('converts an object into toString-ed value', function () {
                            var obj = {
                                name: 'OBJECT_NAME',
                                toString: function () { return "Name: " + this.name; }
                            };
                            assert_1.strictEqual(stringifier.stringify(obj), 'Name: OBJECT_NAME');
                        });
                        it("wraps a toString-ed field value with double quote if the value contains \"" + delim + "\"", function () {
                            var obj = {
                                name: "OBJECT" + delim + "NAME",
                                toString: function () { return "Name: " + this.name; }
                            };
                            assert_1.strictEqual(stringifier.stringify(obj), "\"Name: OBJECT" + delim + "NAME\"");
                        });
                        it('escapes double quotes in a toString-ed field value if the value has double quotes', function () {
                            var obj = {
                                name: 'OBJECT_NAME"',
                                toString: function () { return "Name: " + this.name; }
                            };
                            assert_1.strictEqual(stringifier.stringify(obj), '"Name: OBJECT_NAME"""');
                        });
                    };
                }
            });
        }
    };
});
System.register("test/helper", ["assert", "fs"], function (exports_15, context_15) {
    "use strict";
    var assert_2, fs_2, testFilePath, assertFile, assertRejected;
    var __moduleName = context_15 && context_15.id;
    return {
        setters: [
            function (assert_2_1) {
                assert_2 = assert_2_1;
            },
            function (fs_2_1) {
                fs_2 = fs_2_1;
            }
        ],
        execute: function () {
            exports_15("testFilePath", testFilePath = function (id) { return "./test-tmp/" + id + ".csv"; });
            exports_15("assertFile", assertFile = function (path, expectedContents, encoding) {
                var actualContents = fs_2.readFileSync(path, encoding || 'utf8');
                assert_2.strictEqual(actualContents, expectedContents);
            });
            exports_15("assertRejected", assertRejected = function (p, message) {
                return p.then(function () { return new Error('Should not have been called'); }, function (e) { assert_2.strictEqual(e.message, message); });
            });
        }
    };
});
System.register("test/write-array-records.test", ["test/helper", "fs", "index"], function (exports_16, context_16) {
    "use strict";
    var helper_1, fs_3, index_1;
    var __moduleName = context_16 && context_16.id;
    return {
        setters: [
            function (helper_1_1) {
                helper_1 = helper_1_1;
            },
            function (fs_3_1) {
                fs_3 = fs_3_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            describe('Write array records into CSV', function () {
                var makeFilePath = function (id) { return helper_1.testFilePath("array-" + id); };
                var records = [
                    ['Bob', 'French'],
                    ['Mary', 'English']
                ];
                describe('When only path is specified', function () {
                    var filePath = makeFilePath('minimum');
                    var writer;
                    beforeEach(function () {
                        writer = index_1.createArrayCsvWriter({ path: filePath });
                    });
                    it('writes records to a new file', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'Bob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                    it('appends records when requested to write to the same file', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[0]])];
                                case 1:
                                    _a.sent();
                                    return [4, writer.writeRecords([records[1]])];
                                case 2:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'Bob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When field header is given', function () {
                    var filePath = makeFilePath('header');
                    var writer;
                    beforeEach(function () {
                        writer = index_1.createArrayCsvWriter({
                            path: filePath,
                            header: ['NAME', 'LANGUAGE']
                        });
                    });
                    it('writes a header', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                    it('appends records without headers', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[0]])];
                                case 1:
                                    _a.sent();
                                    return [4, writer.writeRecords([records[1]])];
                                case 2:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When `append` flag is specified', function () {
                    var filePath = makeFilePath('append');
                    fs_3.writeFileSync(filePath, 'Mike,German\n', 'utf8');
                    var writer = index_1.createArrayCsvWriter({
                        path: filePath,
                        append: true
                    });
                    it('do not overwrite the existing contents and appends records to them', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[1]])];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'Mike,German\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When encoding is specified', function () {
                    var filePath = makeFilePath('encoding');
                    var writer = index_1.createArrayCsvWriter({
                        path: filePath,
                        encoding: 'utf16le'
                    });
                    it('writes to a file with the specified encoding', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'Bob,French\nMary,English\n', 'utf16le');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When semicolon is specified as a field delimiter', function () {
                    var filePath = makeFilePath('field-delimiter');
                    var writer = index_1.createArrayCsvWriter({
                        path: filePath,
                        header: ['NAME', 'LANGUAGE'],
                        fieldDelimiter: ';'
                    });
                    it('uses semicolon instead of comma to separate fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'NAME;LANGUAGE\nBob;French\nMary;English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When newline is specified', function () {
                    var filePath = makeFilePath('newline');
                    var writer = index_1.createArrayCsvWriter({
                        path: filePath,
                        recordDelimiter: '\r\n'
                    });
                    it('writes to a file with the specified newline character', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, 'Bob,French\r\nMary,English\r\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When `alwaysQuote` flag is set', function () {
                    var filePath = makeFilePath('always-quote');
                    var writer = index_1.createArrayCsvWriter({
                        path: filePath,
                        header: ['NAME', 'LANGUAGE'],
                        alwaysQuote: true
                    });
                    it('quotes all fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_1.assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n');
                                    return [2];
                            }
                        });
                    }); });
                });
            });
        }
    };
});
System.register("test/write-object-records.test", ["test/helper", "fs", "index"], function (exports_17, context_17) {
    "use strict";
    var helper_2, fs_4, index_2;
    var __moduleName = context_17 && context_17.id;
    return {
        setters: [
            function (helper_2_1) {
                helper_2 = helper_2_1;
            },
            function (fs_4_1) {
                fs_4 = fs_4_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }
        ],
        execute: function () {
            describe('Write object records into CSV', function () {
                var makeFilePath = function (id) { return helper_2.testFilePath("object-" + id); };
                var records = [
                    { name: 'Bob', lang: 'French', address: { country: 'France' } },
                    { name: 'Mary', lang: 'English' }
                ];
                describe('When only path and header ids are given', function () {
                    var filePath = makeFilePath('minimum');
                    var writer;
                    beforeEach(function () {
                        writer = index_2.createObjectCsvWriter({
                            path: filePath,
                            header: ['name', 'lang']
                        });
                    });
                    it('writes records to a new file', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'Bob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                    it('appends records when requested to write to the same file', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[0]])];
                                case 1:
                                    _a.sent();
                                    return [4, writer.writeRecords([records[1]])];
                                case 2:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'Bob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When header ids are given with reverse order', function () {
                    var filePath = makeFilePath('column-order');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: ['lang', 'name']
                    });
                    it('also writes columns with reverse order', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'French,Bob\nEnglish,Mary\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When field header is given with titles', function () {
                    var filePath = makeFilePath('header');
                    var writer;
                    beforeEach(function () {
                        writer = index_2.createObjectCsvWriter({
                            path: filePath,
                            header: [{ id: 'name', title: 'NAME' }, { id: 'lang', title: 'LANGUAGE' }]
                        });
                    });
                    it('writes a header', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                    it('appends records without headers', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[0]])];
                                case 1:
                                    _a.sent();
                                    return [4, writer.writeRecords([records[1]])];
                                case 2:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'NAME,LANGUAGE\nBob,French\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When `append` flag is specified', function () {
                    var filePath = makeFilePath('append');
                    fs_4.writeFileSync(filePath, 'Mike,German\n', 'utf8');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: ['name', 'lang'],
                        append: true
                    });
                    it('do not overwrite the existing contents and appends records to them', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords([records[1]])];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'Mike,German\nMary,English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When encoding is specified', function () {
                    var filePath = makeFilePath('encoding');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: ['name', 'lang'],
                        encoding: 'utf16le'
                    });
                    it('writes to a file with the specified encoding', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'Bob,French\nMary,English\n', 'utf16le');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When semicolon is specified as a field delimiter', function () {
                    var filePath = makeFilePath('field-delimiter');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: [{ id: 'name', title: 'NAME' }, { id: 'lang', title: 'LANGUAGE' }],
                        fieldDelimiter: ';'
                    });
                    it('uses semicolon instead of comma to separate fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'NAME;LANGUAGE\nBob;French\nMary;English\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When newline is specified', function () {
                    var filePath = makeFilePath('newline');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: ['name', 'lang'],
                        recordDelimiter: '\r\n'
                    });
                    it('writes to a file with the specified newline character', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'Bob,French\r\nMary,English\r\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When `alwaysQuote` flag is set', function () {
                    var filePath = makeFilePath('always-quote');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: [{ id: 'name', title: 'NAME' }, { id: 'lang', title: 'LANGUAGE' }],
                        alwaysQuote: true
                    });
                    it('quotes all fields', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, '"NAME","LANGUAGE"\n"Bob","French"\n"Mary","English"\n');
                                    return [2];
                            }
                        });
                    }); });
                });
                describe('When `headerIdDelimiter` flag is set', function () {
                    var filePath = makeFilePath('nested');
                    var writer = index_2.createObjectCsvWriter({
                        path: filePath,
                        header: [{ id: 'name', title: 'NAME' }, { id: 'address.country', title: 'COUNTRY' }],
                        headerIdDelimiter: '.'
                    });
                    it('breaks keys into key paths', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, writer.writeRecords(records)];
                                case 1:
                                    _a.sent();
                                    helper_2.assertFile(filePath, 'NAME,COUNTRY\nBob,France\nMary,\n');
                                    return [2];
                            }
                        });
                    }); });
                });
            });
        }
    };
});
System.register("test/csv-stringifiers/array.test", ["test/helper/delimiter", "index", "assert"], function (exports_18, context_18) {
    "use strict";
    var delimiter_2, index_3, assert_3;
    var __moduleName = context_18 && context_18.id;
    return {
        setters: [
            function (delimiter_2_1) {
                delimiter_2 = delimiter_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            },
            function (assert_3_1) {
                assert_3 = assert_3_1;
            }
        ],
        execute: function () {
            describe('ArrayCsvStringifier', function () {
                var records = [
                    ['FIELD_A1', 'FIELD_B1'],
                    ['FIELD_A2', 'FIELD_B2']
                ];
                describe('When field delimiter is comma', generateTestCases());
                describe('When field delimiter is semicolon', generateTestCases(';'));
                describe('When field delimiter is neither comma nor semicolon', function () {
                    it('throws an exception', function () {
                        assert_3.throws(function () {
                            index_3.createArrayCsvStringifier({ fieldDelimiter: '/' });
                        });
                    });
                });
                describe('When record delimiter is neither LF nor CR+LF', function () {
                    it('throws an exception', function () {
                        assert_3.throws(function () {
                            index_3.createArrayCsvStringifier({ recordDelimiter: '\r' });
                        });
                    });
                });
                describe('When records input is an iterable other than an array', function () {
                    var stringifier = index_3.createArrayCsvStringifier({
                        header: ['TITLE_A', 'TITLE_B']
                    });
                    function recordGenerator() {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, records[0]];
                                case 1:
                                    _a.sent();
                                    return [4, records[1]];
                                case 2:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }
                    it('converts the records into CSV', function () {
                        assert_3.strictEqual(stringifier.stringifyRecords(recordGenerator()), 'FIELD_A1,FIELD_B1\nFIELD_A2,FIELD_B2\n');
                    });
                });
                describe('When `alwaysQuote` flag is set', function () {
                    var stringifier = index_3.createArrayCsvStringifier({
                        header: ['TITLE_A', 'TITLE_B'],
                        alwaysQuote: true
                    });
                    it('quotes all header fields', function () {
                        assert_3.strictEqual(stringifier.getHeaderString(), '"TITLE_A","TITLE_B"\n');
                    });
                    it('quotes all data fields', function () {
                        assert_3.strictEqual(stringifier.stringifyRecords(records), '"FIELD_A1","FIELD_B1"\n"FIELD_A2","FIELD_B2"\n');
                    });
                });
                function generateTestCases(fieldDelimiter) {
                    var delim = delimiter_2.resolveDelimiterChar(fieldDelimiter);
                    return function () {
                        describe('header is specified as a list of column titles', function () {
                            var stringifier = index_3.createArrayCsvStringifier({
                                header: ['TITLE_A', 'TITLE_B'],
                                fieldDelimiter: fieldDelimiter
                            });
                            it("returns a header line with field separated by \"" + delim + "\"", function () {
                                assert_3.strictEqual(stringifier.getHeaderString(), "TITLE_A" + delim + "TITLE_B\n");
                            });
                            it("converts given data records into CSV lines with field separated by \"" + delim + "\"", function () {
                                assert_3.strictEqual(stringifier.stringifyRecords(records), "FIELD_A1" + delim + "FIELD_B1\nFIELD_A2" + delim + "FIELD_B2\n");
                            });
                        });
                        describe('header is not specified', function () {
                            var stringifier = index_3.createArrayCsvStringifier({ fieldDelimiter: fieldDelimiter });
                            it('returns null for header line', function () {
                                assert_3.strictEqual(stringifier.getHeaderString(), null);
                            });
                            it("converts given data records into CSV lines with field separated by \"" + delim + "\"", function () {
                                assert_3.strictEqual(stringifier.stringifyRecords(records), "FIELD_A1" + delim + "FIELD_B1\nFIELD_A2" + delim + "FIELD_B2\n");
                            });
                        });
                    };
                }
            });
        }
    };
});
System.register("test/csv-stringifiers/object.test", ["test/helper/delimiter", "index", "assert"], function (exports_19, context_19) {
    "use strict";
    var delimiter_3, index_4, assert_4;
    var __moduleName = context_19 && context_19.id;
    return {
        setters: [
            function (delimiter_3_1) {
                delimiter_3 = delimiter_3_1;
            },
            function (index_4_1) {
                index_4 = index_4_1;
            },
            function (assert_4_1) {
                assert_4 = assert_4_1;
            }
        ],
        execute: function () {
            describe('ObjectCsvStringifier', function () {
                var records = [
                    { FIELD_A: 'VALUE_A1', FIELD_B: 'VALUE_B1' },
                    { FIELD_A: 'VALUE_A2', FIELD_B: 'VALUE_B2', OTHERS: { FIELD_C: 'VALUE_C2' } }
                ];
                describe('When field delimiter is comma', generateTestCases());
                describe('When field delimiter is semicolon', generateTestCases(';'));
                describe('When field delimiter is neither comma nor semicolon', function () {
                    it('throws an exception', function () {
                        assert_4.throws(function () {
                            index_4.createObjectCsvStringifier({
                                header: ['FIELD_A', 'FIELD_B'],
                                fieldDelimiter: '/'
                            });
                        });
                    });
                });
                describe('When record delimiter is neither LF nor CR+LF', function () {
                    it('throws an exception', function () {
                        assert_4.throws(function () {
                            index_4.createObjectCsvStringifier({
                                header: ['FIELD_A', 'FIELD_B'],
                                recordDelimiter: '\r'
                            });
                        });
                    });
                });
                describe('When records input is an iterable other than an array', function () {
                    var stringifier = index_4.createObjectCsvStringifier({
                        header: ['FIELD_A', 'FIELD_B']
                    });
                    function recordGenerator() {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, records[0]];
                                case 1:
                                    _a.sent();
                                    return [4, records[1]];
                                case 2:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }
                    it('converts the records into CSV', function () {
                        assert_4.strictEqual(stringifier.stringifyRecords(recordGenerator()), 'VALUE_A1,VALUE_B1\nVALUE_A2,VALUE_B2\n');
                    });
                });
                describe('When `alwaysQuote` flag is set', function () {
                    var stringifier = index_4.createObjectCsvStringifier({
                        header: [
                            { id: 'FIELD_A', title: 'TITLE_A' },
                            { id: 'FIELD_B', title: 'TITLE_B' }
                        ],
                        alwaysQuote: true
                    });
                    it('quotes all header fields', function () {
                        assert_4.strictEqual(stringifier.getHeaderString(), '"TITLE_A","TITLE_B"\n');
                    });
                    it('quotes all data fields', function () {
                        assert_4.strictEqual(stringifier.stringifyRecords(records), '"VALUE_A1","VALUE_B1"\n"VALUE_A2","VALUE_B2"\n');
                    });
                });
                describe('When `headerIdDelimiter` is set', function () {
                    var stringifier = index_4.createObjectCsvStringifier({
                        header: [
                            { id: 'FIELD_A', title: 'TITLE_A' },
                            { id: 'OTHERS/FIELD_C', title: 'TITLE_C' }
                        ],
                        headerIdDelimiter: '/'
                    });
                    it('uses the title as is', function () {
                        assert_4.strictEqual(stringifier.getHeaderString(), 'TITLE_A,TITLE_C\n');
                    });
                    it('picks up a value in nested objects', function () {
                        assert_4.strictEqual(stringifier.stringifyRecords(records), 'VALUE_A1,\nVALUE_A2,VALUE_C2\n');
                    });
                });
                function generateTestCases(fieldDelimiter) {
                    var delim = delimiter_3.resolveDelimiterChar(fieldDelimiter);
                    return function () {
                        describe('header is specified with title', function () {
                            var stringifier = index_4.createObjectCsvStringifier({
                                header: [
                                    { id: 'FIELD_A', title: 'TITLE_A' },
                                    { id: 'FIELD_B', title: 'TITLE_B' }
                                ],
                                fieldDelimiter: fieldDelimiter
                            });
                            it("returns a header line with field separated by \"" + delim + "\"", function () {
                                assert_4.strictEqual(stringifier.getHeaderString(), "TITLE_A" + delim + "TITLE_B\n");
                            });
                            it("converts given data records into CSV lines with field separated by \"" + delim + "\"", function () {
                                assert_4.strictEqual(stringifier.stringifyRecords(records), "VALUE_A1" + delim + "VALUE_B1\nVALUE_A2" + delim + "VALUE_B2\n");
                            });
                        });
                        describe('header is specified without title', function () {
                            var stringifier = index_4.createObjectCsvStringifier({
                                header: ['FIELD_A', 'FIELD_B'],
                                fieldDelimiter: fieldDelimiter
                            });
                            it('returns null for header line', function () {
                                assert_4.strictEqual(stringifier.getHeaderString(), null);
                            });
                            it("converts given data records into CSV lines with field separated by \"" + delim + "\"", function () {
                                assert_4.strictEqual(stringifier.stringifyRecords(records), "VALUE_A1" + delim + "VALUE_B1\nVALUE_A2" + delim + "VALUE_B2\n");
                            });
                        });
                        describe('header columns are given with reverse order', function () {
                            var stringifier = index_4.createObjectCsvStringifier({
                                header: [
                                    { id: 'FIELD_B', title: 'TITLE_B' },
                                    { id: 'FIELD_A', title: 'TITLE_A' }
                                ],
                                fieldDelimiter: fieldDelimiter
                            });
                            it("layouts fields with the order of headers given with field separated by \"" + delim + "\"", function () {
                                assert_4.strictEqual(stringifier.stringifyRecords(records), "VALUE_B1" + delim + "VALUE_A1\nVALUE_B2" + delim + "VALUE_A2\n");
                            });
                        });
                    };
                }
            });
        }
    };
});
System.register("test/lang/promise.test", ["lib/lang/promise", "assert", "test/helper"], function (exports_20, context_20) {
    "use strict";
    var promise_2, assert_5, helper_3;
    var __moduleName = context_20 && context_20.id;
    return {
        setters: [
            function (promise_2_1) {
                promise_2 = promise_2_1;
            },
            function (assert_5_1) {
                assert_5 = assert_5_1;
            },
            function (helper_3_1) {
                helper_3 = helper_3_1;
            }
        ],
        execute: function () {
            describe('Promise', function () {
                var greetAsync = function (name, callback) {
                    setTimeout(function () {
                        if (name === 'foo')
                            callback(null, "Hello, " + name + "!");
                        else
                            callback(new Error("We don't know " + name));
                    }, 0);
                };
                var promisifiedFn = promise_2.promisify(greetAsync);
                it('promisify node style callback', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = assert_5.strictEqual;
                                return [4, promisifiedFn('foo')];
                            case 1:
                                _a.apply(void 0, [_b.sent(), 'Hello, foo!']);
                                return [2];
                        }
                    });
                }); });
                it('raise an error for error', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, helper_3.assertRejected(promisifiedFn('bar'), "We don't know bar")];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
            });
        }
    };
});
//# sourceMappingURL=tsc.js.map