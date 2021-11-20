const persons = ["Ninski_ist_dumm", "Robert_ist_schlau", "Lillski", "Jaseski"]
const wichtelMap = new Map<number, number>()
const personsMap = new Map<string, number>()
const numberToPersonsMap = new Map<number, string>()
const usedPersons = new Map<number, boolean>()
const result = new Map<string, string>()

function mapPersons(persons: string[]){
    persons.forEach((p, idx) => {
        personsMap.set(p, idx)
        numberToPersonsMap.set(idx, p)
        usedPersons.set(idx, false)
    })
}

function generateMatches(persons: string[]){
    for (const p of persons){
        let finished = false
        const pAsNumber = personsMap.get(p)
        while(!finished){
            const match = randomIntFromInterval(0, persons.length-1)
            if(usedPersons.get(match) || pAsNumber == match) continue
            wichtelMap.set(pAsNumber, match)
            usedPersons.set(match, true)
            finished = true
        }
    }
}

function mapNumbersToStrings(){
    for(const person of persons){
        const personAsNumber = personsMap.get(person)
        const match = wichtelMap.get(personAsNumber)
        result.set(person, numberToPersonsMap.get(match))
    }
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

mapPersons(persons)
generateMatches(persons)
mapNumbersToStrings()

import * as fs from "fs"
for(const person of persons){
    fs.writeFileSync("wichtel-results/" + person + ".txt", result.get(person))
}