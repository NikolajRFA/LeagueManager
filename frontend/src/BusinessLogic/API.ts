export default class API {
    static url: string = 'http://localhost:5000/'

    static flag = (country: string): string => `https://flagcdn.com/${country.toLowerCase()}.svg`;
}