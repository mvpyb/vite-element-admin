<template>
  <yu-layout title="xml" subtitle="xml的简单使用">
    <template #body>
      <div class="app-container">
        <div v-loading="loading">
          <el-button
            type="primary"
            @click="toggleClick"
            style="margin-bottom: 30px"
            >解析xml</el-button
          >

          <div class="file-info">
            <el-table :data="fileList" style="width: 100%" align="center">
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column prop="tagName" label="tagName" width="150">
              </el-table-column>
              <el-table-column prop="children" label="children数量" width="150">
                <template #default="scope">
                  <span>{{
                    scope.row.children ? scope.row.children.length : 0
                  }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="attributes" label="attributes">
                <template #default="scope">
                  <div
                    class="txt-item"
                    v-for="(attr, index) in scope.row.customAttr"
                    :key="index"
                  >
                    <strong>name :</strong> {{ attr.name }}
                    <el-divider direction="vertical" />
                    <strong>value :</strong>{{ attr.value }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </template>
  </yu-layout>
</template>

<script setup>
import { ref } from 'vue'
import YuLayout from '/@/components/YuLayout'
const loading = ref( false )

const xmlDom = ref( '' )
const fileList = ref( [] )
async function toggleClick() {
  analysisXml()
}

async function analysisXml() {
  // const txt = '/static/test/1.txt'
  const xml = '/static/test/1.xml'

  const xmlhttp = window.XMLHttpRequest
    ? new XMLHttpRequest()
    // eslint-disable-next-line no-undef
    : new ActiveXObject( 'Microsoft.XMLHTTP' )
  xmlhttp.onload = () => {
    xmlDom.value = xmlhttp.responseXML
    const tags = xmlhttp.responseXML.getElementsByTagName( 'manifest' )
    fileList.value = xmlToArray( tags, [] )
  }

  // 用open可以指定get,post
  /**
   * 第一个参数是请求方式，
   * 第二个参数是文件地址，
   * 第三个参数为是否为异步（默认为true(是) / false(否)
   * */
  xmlhttp.open( 'GET', xml, false )
  xmlhttp.send()

  function xmlToArray( xml, data = [] ) {
    const len = xml.length
    if ( !xml || !len ) return
    for ( let i = 0; i < len; i++ ) {
      const { attributes, childNodes, children, className, tagName } =
        xml.item( i )
      const obj = {
        tagName,
        className,
        children,
        attributes,
        childNodes,
        customAttr : []
      }
      if ( attributes && attributes.length ) {
        const aLen = attributes.length
        for ( let j = 0; j < aLen; j++ ) {
          obj.customAttr.push( {
            name : attributes[j].name,
            value : attributes[j].value
          } )
        }
      }
      data.push( obj )
      if ( children && children.length ) {
        xmlToArray( children, data )
      }
    }
    return data
  }
}
</script>
