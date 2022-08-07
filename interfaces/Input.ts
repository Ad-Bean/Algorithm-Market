export interface InputBody {
  input: string;
  item_id: number;
}

/**
 * 获取输出
 */
export interface OutputResponse {
  /**
   * 返回状态
   */
  code: number;
  /**
   * 返回数据
   */
  data?: Output;
  /**
   * 返回信息
   */
  message: string;
}

export interface Output {
  /**
   * 图片
   */
  img: string;
  /**
   * 文本
   */
  text: string;
}
