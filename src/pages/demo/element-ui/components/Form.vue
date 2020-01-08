<template>
    <demo-wrapper
        :title="title">
        <demo-wrapper
            class="sub-demo-1"
            slot="demo-content"
            style="background-color: #fff"
            :title="subtitles[0]">
            <template slot="demo-content">
                <el-row>
                    <el-radio v-model="radio" label="1">备选项</el-radio>
                    <el-radio v-model="radio" label="2">备选项</el-radio>
                </el-row>
                <el-row>
                    <el-radio disabled v-model="radio" label="1">备选项</el-radio>
                    <el-radio disabled v-model="radio" label="2">备选项</el-radio>
                </el-row>
            </template>
        </demo-wrapper>

        <demo-wrapper
            class="sub-demo-2"
            slot="demo-content"
            style="background-color: #fff"
            :title="subtitles[1]">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                status-icon
                label-width="100px"
                label-suffix=" :"
                slot="demo-content">
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" prop="region">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-form-item prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" class="line" style="text-align: center"> - </el-col>
                    <el-col :span="11">
                        <el-form-item prop="date2">
                            <el-time-picker type="time" placeholder="选择时间" v-model="form.date2" style="width: 100%"></el-time-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="线上品牌商赞助"></el-radio>
                        <el-radio label="线上场地免费"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </demo-wrapper>
    </demo-wrapper>
</template>

<script>
import DemoWrapper from './DemoWrapper'

export default {
    name: 'FormDemo',
    data () {
        return {
            title: 'Form demo',
            subtitles: ['1. Radio',
                        '2. Form'],
            radio: '1',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delevery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min:3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'chagne' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '已成功提交数据',
                        type: 'success'
                    })
                } else {
                    this.$message({
                        message: '请按格式输入信息',
                        type: 'error'
                    })
                }
            })
        },
        resetForm (formName) {
            this.$message('数据已重置');
            this.$refs[formName].resetFields();
        }
    },
    components: {
        DemoWrapper
    }
}
</script>

<style lang="stylus" scoped>
    .el-button >>> span
        font-size 1.4rem
    .el-radio
        margin-bottom 1.5rem
</style>