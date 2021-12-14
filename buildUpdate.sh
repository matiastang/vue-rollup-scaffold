#!/bin/zsh
###
 # @Author: matiastang
 # @Date: 2021-12-14 15:28:57
 # @LastEditors: matiastang
 # @LastEditTime: 2021-12-14 16:19:08
 # @FilePath: /datumwealth-openalpha-front/buildUpdate.sh
 # @Description: 测试环境build文件更新
###
# 接收第一个参数,并设置IP
ip=$1
# 接收第二个参数,并设置path
path=$2
# build
vite --config vite.config.ts build --mode production
if (($? != 0))
then 
    echo "build失败"
else
    echo "build成功"
    # 项目目录
    project_path=$(cd `dirname $0`; pwd)
    # 查看build目录是否存在
    if [ -d "$project_path/build/" ]
    then
        #build目录存在
        # 上传
        scp -r $project_path/build/ $ip:$path
        echo "$project_path/build/目录已上传到$ip的$path目录"
    else
        #build目录不存在
        echo "$project_path/build/目录不存在!"
    fi
fi