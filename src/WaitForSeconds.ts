namespace zen {
    export function waitForSeconds(time:number = 1):Promise<{}> {
        return new Promise(function(resolve, reject) {
            setTimeout(() => resolve(), time * 1000);
        });
    }
}