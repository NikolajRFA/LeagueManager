export default class Utils {
    static capitalize = (s: string): string => s.substring(0, 1).toUpperCase() + s.substring(1);
    static getLastIdFromUrl = (url: string): number => Number(url.split('/').pop())
}