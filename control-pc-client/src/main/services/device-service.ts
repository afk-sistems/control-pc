import os from 'os';
import child_process from 'child_process';

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

export const shutdownDevice = (timeInMs:number) => {
    child_process.exec(`shutdown -s -t ${timeInMs}`, (error, stdout, stderr) => {
        if (error) {
            throw new Error(error + "");
        }
    });
}

export const cancelShutdown = () => {
    child_process.exec(`shutdown -a`, (error, stdout, stderr) => {
        if (error) {
            throw new Error(error + "");
        }
    });
}

export const getUniqueDeviceID = ():Promise<string> => {
    return "";
}



