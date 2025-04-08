export default {
    send: ["socket:request"],
    receive: ["socket:response"],
    invoke: ["device:info"]
} as ApiChannels

interface ApiChannels {
    send: string[],
    receive: string[],
    invoke: string[]
}