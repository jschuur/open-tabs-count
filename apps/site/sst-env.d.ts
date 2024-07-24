/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    CachePolicy: {
      type: "sst.sst.Secret"
      value: string
    }
    Config: {
      cachePolicy: string
      dataStaleTime: string
      debugOutput: string
      siteHostName: string
      tinybirdBaseUrl: string
      tinybirdTokenDashboard: string
      type: "sst.sst.Linkable"
      userEmail: string
    }
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
    SiteHostName: {
      type: "sst.sst.Secret"
      value: string
    }
    TinybirdBaseUrl: {
      type: "sst.sst.Secret"
      value: string
    }
    TinybirdTokenDashboard: {
      type: "sst.sst.Secret"
      value: string
    }
    UserEmail: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
export {}
