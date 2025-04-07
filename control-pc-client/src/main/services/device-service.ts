import os from 'os';

export const getDeviceInformation = () => {
    
    return {
        osType: os.type(),
        osPlatform: os.platform(),
        osArch: os.arch(),
        osRelease: os.release(),
        osUptime: Math.ceil(os.uptime() / 60),
        //CPU
        cpuArchitecture: os.endianness(),
        cpuNumbers: os.cpus().length,
        cpuDetail: os.cpus().at(0)?.model,

        //MEMORY
        totalMemory: (os.totalmem() / (1024*1024*1024)).toFixed(2),

        //USUARIO
        hostname: os.hostname(),
        username: process.env.USER || process.env.USERNAME
    }
}