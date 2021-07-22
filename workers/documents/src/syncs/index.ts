const am = require('am')
const got = require('got')
const { promisify } = require('util')
const { setImmediate } = require('timers')

const setImmediateP = promisify(setImmediate)

async function mapItem(mapFn: (arg0: any, arg1: any, arg2: any) => any, currentValue: any, index: any, array: any) {
    try {
        await setImmediateP()
        return {
            status: 'fulfilled',
            value: await mapFn(currentValue, index, array)
        }
    } catch (reason) {
        return {
            status: 'rejected',
            reason
        }
    }
}

async function worker(id: number, gen: Generator<any[], void, unknown>, mapFn: (arg0: any, arg1: any, arg2: any) => any, result: any[]) {
    console.time(`Worker ${id}`)
    for (let [ currentValue, index, array ] of gen) {
        console.time(`Worker ${id} --- index ${index} item ${currentValue}`)
        result[index] = await mapItem(mapFn, currentValue, index, array)
        console.timeEnd(`Worker ${id} --- index ${index} item ${currentValue}`)
    }
    console.timeEnd(`Worker ${id}`)
}

function* arrayGenerator(array: string | any[]) {
    for (let index = 0; index < array.length; index++) {
        const currentValue = array[index]
        yield [ currentValue, index, array ]
    }
}

async function mapAllSettled(arr: string | any[], mapFn: (url: any, i: any) => Promise<{ i: any; url: any; contents: any }>, limit = arr.length) {
    const result: any[] = []

    if (arr.length === 0) {
        return result
    }

    const gen = arrayGenerator(arr)

    limit = Math.min(limit, arr.length)

    const workers = new Array(limit)
    for (let i = 0; i < limit; i++) {
        workers.push(worker(i, gen, mapFn, result))
    }

    console.log(`Initialized ${limit} workers`)

    await Promise.all(workers)

    return result
}


const urls: string[] = []
for (let i = 0; i < 100; i++) {
    urls.push(`https://www.google.com/search?q=${i}`)
}

async function mapFn(url: any, i: any) {
    const contents = await got(url)
    return { i, url, contents }
}

export async function main() {
    console.time('Promise.allSettled')
    const results1 = await Promise.allSettled(urls.map(mapFn))
    console.timeEnd('Promise.allSettled')
    console.log('------------')
    console.dir(results1)

    console.time('mapAllSettled')
    const results2 = await mapAllSettled(urls, mapFn, 10)
    console.timeEnd('mapAllSettled')
    console.log('------------')
    console.dir(results2)
}