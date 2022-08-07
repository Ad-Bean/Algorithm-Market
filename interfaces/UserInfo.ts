export interface UserResponse {
  /**
   * 返回代码
   */
  code: number;
  /**
   * 用户信息
   */
  data: UserInfo;
  /**
   * 返回信息
   */
  message: string;
}

export interface UserInfo {
  /**
   * 头像，base64
   */
  avatar: string;
  /**
   * 硬币数量
   */
  coin: number;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 用户身份，admin或guest
   */
  role: "admin" | "guest";
  /**
   * 用户名，长度为5-30
   */
  username: string;
}
