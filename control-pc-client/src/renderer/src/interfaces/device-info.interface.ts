export interface IDeviceInformation{
    osType: string;
    osPlatform: NodeJS.Platform;
    osArch: string;
    osRelease: string;
    osUptime: number;
    cpuArchitecture: "BE" | "LE";
    cpuNumbers: number;
    cpuDetail: string | undefined;
    totalMemory: string;
    hostname: string;
    username: string | undefined;
}