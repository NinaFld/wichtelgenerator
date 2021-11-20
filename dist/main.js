"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const persons = ["Ninski_ist_dumm", "Robert_ist_schlau", "Lillski", "Jaseski"];
const wichtelMap = new Map();
const personsMap = new Map();
const numberToPersonsMap = new Map();
const usedPersons = new Map();
const result = new Map();
function mapPersons(persons) {
    persons.forEach((p, idx) => {
        personsMap.set(p, idx);
        numberToPersonsMap.set(idx, p);
        usedPersons.set(idx, false);
    });
}
function generateMatches(persons) {
    for (const p of persons) {
        let finished = false;
        const pAsNumber = personsMap.get(p);
        while (!finished) {
            const match = randomIntFromInterval(0, persons.length - 1);
            if (usedPersons.get(match) || pAsNumber == match)
                continue;
            wichtelMap.set(pAsNumber, match);
            usedPersons.set(match, true);
            finished = true;
        }
    }
}
function mapNumbersToStrings() {
    for (const person of persons) {
        const personAsNumber = personsMap.get(person);
        const match = wichtelMap.get(personAsNumber);
        result.set(person, numberToPersonsMap.get(match));
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
mapPersons(persons);
generateMatches(persons);
mapNumbersToStrings();
const readline = __importStar(require("readline"));
function topLevelAwaitWrapper(counter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (counter >= persons.length)
            return;
        const person = persons[counter];
        // console.log(`Match for ${person}`)
        // console.log("Press enter to see result")
        // prompt.get(['egal'], function (err, result) {
        //     console.log(result.get(person))
        //     console.log('  Username: ' + result.username);
        //     console.log('  Email: ' + result.email);
        // });
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        yield rl.question(`Press enter to see result for\n${person}`, function (name) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(result.get(person));
                rl.close();
                yield topLevelAwaitWrapper(counter + 1);
            });
        });
    });
}
//topLevelAwaitWrapper(0)
const fs = __importStar(require("fs"));
for (const person of persons) {
    fs.writeFileSync(person + ".txt", result.get(person));
}
