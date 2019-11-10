declare module "koa-proxies" {
  export interface IKoaProxies {
    target: string;
    changeOrigin?: boolean;
    logs?: boolean;
    agent?: any;
    rewrite?: (path: string) => string;
  }

  export default function proxy(path: string, options: IKoaProxies): Promise;
}
