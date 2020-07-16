/**
 * 频道请求模块
 */

import request from '@/utils/request'

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

// 新增用户频道
export const addUserChannels = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

// 删除用户频道
export const deleteUserChannels = channelsId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelsId}`
  })
}
