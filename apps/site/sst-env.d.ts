/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    DataStaleTime: {
      type: "sst.sst.Secret"
      value: string
    }
    DebugOutput: {
      type: "sst.sst.Secret"
      value: string
    }
    Site: {
      type: "sst.aws.Nextjs"
      url: string
    }
    TinybirdBaseUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    TinybirdTokenDashboard: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}