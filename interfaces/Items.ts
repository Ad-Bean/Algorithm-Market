/**
 * 商品列表
 */
export interface ItemsResponse {
  /**
   * 返回状态
   */
  code: number;
  /**
   * 返回数据
   */
  data: ItemInfo[];
  /**
   * 返回信息
   */
  message: string;
}

/**
 * ItemInfo
 */
export interface ItemInfo {
  /**
   * 商品简介
   */
  brief: string;
  /**
   * 商品id
   */
  id: number;
  /**
   * 商品名字
   */
  name: string;
  /**
   * 商品图片
   */
  picture: string;
  /**
   * 商品标签
   */
  tag: string[];
}

export interface ItemInfoResponse {
  /**
   * 返回状态
   */
  code: number;
  /**
   * 返回数据
   */
  data: ItemInformation;
  /**
   * 返回信息
   */
  message: string;
}

/**
 * ItemInformation
 */
export interface ItemInformation {
  /**
   * 商品算法介绍
   */
  algorithm: string;
  /**
   * 商品简介
   */
  brief: string;
  /**
   * 代码，管理员身份才会返回该数据
   */
  code?: string;
  /**
   * 输入样例
   */
  input: string[];
  /**
   * 商品介绍
   */
  introduce: string;
  /**
   * 运行内存，单位kb，管理员身份才会返回该数据
   */
  memory?: number;
  /**
   * 商品名字
   */
  name: string;
  /**
   * 输出是否包含图片，管理员身份才会返回该数据
   */
  outputImg?: boolean;
  /**
   * 商品图片
   */
  picture: string;
  /**
   * 商品标签
   */
  tag: string[];
  /**
   * 运行时间，单位ms，管理员身份才会返回该数据
   */
  time?: number;
}
