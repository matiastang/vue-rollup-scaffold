<!--
 * @Author: matiastang
 * @Date: 2021-12-06 16:57:45
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-09 11:24:58
 * @FilePath: /datumwealth-openalpha-front/src/views/web/interfaceInfo/components/requestExample/RequestExample.vue
 * @Description: 示例代码
-->
<template>
    <el-tabs class="request-example-tabs" v-model="activeName">
        <!-- <el-tab-pane class="right-tab right-info" label="C#" name="c#">
            <pre>{{ c }}</pre>
        </el-tab-pane> -->
        <el-tab-pane class="right-tab right-error" label="JAVA" name="java">
            <pre class="pre-text">{{ java }}</pre>
        </el-tab-pane>
        <!-- <el-tab-pane class="right-tab right-sample" label="PHP" name="php">
            <pre>{{ php }}</pre>
        </el-tab-pane> -->
        <el-tab-pane class="right-tab right-document" label="Python" name="python">
            <pre class="pre-text">{{ python }}</pre>
        </el-tab-pane>
        <!-- <el-tab-pane class="right-tab right-version" label="Node.js" name="node.js">
            <pre>{{ node }}</pre>
        </el-tab-pane> -->
    </el-tabs>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'RequestExample',
    setup() {
        const activeName = ref('java')
        const java = `
package com.dw.member.test;

import org.apache.http.HttpEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/***
 * @Description 西筹开放平台API java请求示例代码
 * @Author datumwealth
 * @Date 2021/12/6
 * 示例：
 *    基金基本信息查询 https://openalpha.cn/open/api/apiInfoCode/A0001/v1?keyword=184696
 *
 *    Apache maven 依赖包
 *    <!-- Apache Http Begin -->
 * <dependency>
 *     <groupId>org.apache.httpcomponents</groupId>
 *     <artifactId>httpclient</artifactId>
 *     <version>4.5.5</version>
 * </dependency>
 * <dependency>
 *     <groupId>org.apache.httpcomponents</groupId>
 *     <artifactId>fluent-hc</artifactId>
 *     <version>4.5.5</version>
 * </dependency>
 * <dependency>
 *     <groupId>org.apache.httpcomponents</groupId>
 *     <artifactId>httpmime</artifactId>
 *     <version>4.5.5</version>
 * </dependency>
 * <!-- Apache Http End -->
 *
 */
public class CallApiDemo {

    private static final String path = "https://openalpha.cn/open/api/apiInfoCode";

    public static void main(String[] args) {
        // 基金基本信息查询接口
        String apiUrl = "/A0001/v1?keyword=184696";
        // key: 个人中心-> 账号设置 -> api key
        String key = "********-****-****-****-************";
        get(path + apiUrl, key);
    }

    /**
     * http get请求
     * @param url 接口url
     * @param key api key
     * @return  返回接口数据
     */
    public static String get(String url, String key) {
        // 创建 HttpClient 客户端
        CloseableHttpClient httpClient = HttpClients.createDefault();
        // 创建 HttpGet 请求
        HttpGet httpGet = new HttpGet(url);
        // 设置长连接
        httpGet.setHeader("Connection", "keep-alive");
        // 设置Authorization（key: 个人中心-> 账号设置 -> api key）
        httpGet.setHeader("Authorization", "Bearer " + key);
        CloseableHttpResponse httpResponse = null;
        String result = null;
        try {
            // 请求并获得响应结果
            httpResponse = httpClient.execute(httpGet);
            HttpEntity httpEntity = httpResponse.getEntity();
            result = EntityUtils.toString(httpEntity);
            // 输出请求结果
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 无论如何必须关闭连接
        finally {
            if (httpResponse != null) {
                try {
                    httpResponse.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (httpClient != null) {
                try {
                    httpClient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    /**
     * http post请求
     * @param url 接口url
     * @param key api key
     * @return  返回接口数据
     */
    public static String post(String url, String key, Map<String, Object> paramMap) {
        // 创建 HttpClient 客户端
        CloseableHttpClient httpClient = HttpClients.createDefault();
        // 创建 httpPost 请求
        HttpPost httpPost = new HttpPost(url);
        // 设置长连接
        httpPost.setHeader("Connection", "keep-alive");
        // 设置Authorization（key: 个人中心-> 账号设置 -> api key）
        httpPost.setHeader("Authorization", "Bearer " + key);
        CloseableHttpResponse httpResponse = null;
        String result = null;
        try {
            // 创建 HttpPost 参数
            List<BasicNameValuePair> params = new ArrayList<BasicNameValuePair>();
            params.add(new BasicNameValuePair("keyword", paramMap.get("keyword").toString()));

            // 设置 HttpPost 参数
            httpPost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
            // 请求并获得响应结果
            httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();
            result = EntityUtils.toString(httpEntity);
            // 输出请求结果
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 无论如何必须关闭连接
        finally {
            if (httpResponse != null) {
                try {
                    httpResponse.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (httpClient != null) {
                try {
                    httpClient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }
}
        `
        const python = `
#coding=utf-8
#!/usr/bin/python

# 接口请求示例为：https://openalpha.cn/open/api/apiInfoCode/A0001/v1?keyword=184696

# pip install requests
import requests
import time
import hashlib
import json
    
# api key可以从 数据中心 -> 我的接口 中获取
api_key = "您的API KEY"
encode = 'utf-8'

url = "https://openalpha.cn/open/api/apiInfoCode/A0001/v1?keyword=184696"
headers={'Authorization': 'Bearer ' + api_key}
response = requests.get(url, headers=headers)

result = response.text

# 结果输出
print(result)
        `
        return {
            activeName,
            java,
            python,
        }
    },
})
</script>

<style lang="scss" scoped>
.request-example-tabs {
    align-self: center;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
    :deep(.el-tabs__nav-scroll) {
        padding: 16px 20px 0px 20px;
        background: #e9e9e9;
    }
    .right-tab {
        width: 100%;
        .pre-text {
            width: 100%;
            font-size: fontSize(14px);
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
            color: rgba($color: #000, $alpha: 0.65);
            padding: 0px 20px;
            box-sizing: border-box;
            overflow: auto;
        }
    }
    .right-info {
        .tab-info-fold {
            margin-top: 32px;
        }
        .base-info-fold {
            width: 100%;
            padding: 12px 36px;
            justify-content: flex-start;
            .base-info-item {
                width: 100%;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 12px;
                .base-info-item-title {
                    font-size: fontSize(14px);
                    color: $titleColor;
                    line-height: 20px;
                    margin-right: 12px;
                    flex-shrink: 0;
                }
                .base-info-item-text {
                    font-size: fontSize(14px);
                    color: #595959;
                    line-height: 20px;
                }
                .base-info-item-url {
                    color: #4e9aeb;
                }
            }
        }
        .base-info-parameter {
            width: 100%;
            padding: 24px 36px;
        }
        .base-info-result {
            width: 100%;
            padding: 12px 36px;
            justify-content: flex-start;
            align-items: flex-start;
            .base-info-item-title {
                font-size: fontSize(14px);
                color: $titleColor;
                line-height: 20px;
                margin-right: 12px;
            }
            .base-info-item-text {
                font-size: fontSize(14px);
                color: #595959;
                line-height: 20px;
            }
        }
    }
    ::v-deep(.el-tabs__item) {
        height: 36px;
        @include defaultFont;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
    }
    ::v-deep(.is-active) {
        color: $themeColor !important;
        @include fontWeight500;
    }
    ::v-deep(.el-tabs__active-bar) {
        background: $themeColor;
    }
}
</style>
