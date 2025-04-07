export default {
    send: [],
    receive: [],
    invoke: ["device:info"]
} as ApiChannels

interface ApiChannels {
    send: string[],
    receive: string[],
    invoke: string[]
}