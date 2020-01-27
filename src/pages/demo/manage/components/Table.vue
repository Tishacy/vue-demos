<template>
    <div class="main">
        <header>
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-input placeholder="标题" v-model="obj.title" ref="objTitle"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="发布人" v-model="obj.author" ref="objAuthor"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-date-picker type="date" placeholder="选择日期" v-model="obj.date" ref="objDate"></el-date-picker>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-col>
            </el-row>
        </header>
        <section class="table">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                :header-cell-style="tableHeaderStyle">
                <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    >
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="发布人"
                    >
                </el-table-column>
                <el-table-column
                    label="发布时间"
                    >
                    <template slot-scope="scope">{{ _formatDate(scope.row.date) }}</template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </section>
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="450px">
            <el-row>
                <el-input placeholder="标题" v-model="editObj.title"></el-input>
            </el-row>
            <el-row>
                <el-input placeholder="发布人" v-model="editObj.author"></el-input>
            </el-row>
            <el-row>
                <el-date-picker type="date" placeholder="日期" style="width: 100%" v-model="editObj.date"></el-date-picker>
            </el-row>
            <el-row>
                <el-button type="primary" @click="handleUpdate()">更新</el-button>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            </el-row>
        </el-dialog>
        <el-backtop target=".el-main"></el-backtop>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data () {
        return {
            obj: {
                title: "",
                author: "",
                date: ""
            },
            editObj: {
                title: "",
                author: "",
                date: "",
            },
            editIndex: 0,
            tableData: [],
            // tableData: [{
            //     title: "This is the first message",
            //     author: "tishacy",
            //     date: new Date()
            // },{
            //     title: "This is the second message",
            //     author: "tishacy",
            //     date: new Date()
            // },{
            //     title: "This is the third message",
            //     author: "tishacy",
            //     date: new Date()
            // },{
            //     title: "This is the fourth message",
            //     author: "Chayatish",
            //     date: new Date()
            // }],
            tableHeaderStyle: {
                backgroundColor: "#545c64",
                color: "#fff",
            },
            dialogVisible: false,
        }
    },
    methods: {
        handleAdd() {
            // check
            console.log(this.$refs.objTitle.value);
            if (!this.$refs.objTitle.value || !this.$refs.objAuthor.value || !this.$refs.objDate.value) {
                this.$message({
                    message: '有字段缺失哦',
                    type: 'warning'
                });
                return;
            }

            // add new item
            const newItem = {
                title: this.obj.title,
                author: this.obj.author,
                date: this.obj.date
            }
            this.tableData.push(newItem);
            this.obj = {
                title: "",
                author: "",
                date: ""
            }
        },
        handleDelete(index, row) {
            this.tableData.splice(index, 1);
        },
        handleEdit(index, row) {
            this.dialogVisible = true;
            this.editIndex = index;
            this.editObj = {...row};
        },
        handleUpdate() {
            this.tableData.splice(this.editIndex, 1, this.editObj);
            this.dialogVisible = false;
        },
        _formatDate(date) {
            let year = '' + date.getFullYear(),
                month = '' + date.getMonth() + 1,
                day = '' + date.getDate();

            month = (month.length < 2)? ('0' + month) : month;
            day = (day.length < 2)? ('0' + day) : day;
            return [year, month, day].join('-')
        }
    },
    mounted () {
        axios.get('/conn/')
        .then(res => {
            console.log(res.data)
            res.data.forEach((item, index) => {
                this.tableData.push({
                    title: item.title,
                    author: item.author,
                    date: new Date(parseInt(item.date))
                })
            })
        }, err => {
            console.log(err);
        })
    }
}
</script>

<style lang="stylus" scoped>
    *
        font-size 1.5rem
    .el-button >>> span 
        font-size 1.4rem
    .table
        margin 2rem 0
        .el-table >>> .cell,
        .el-table >>> .cell div
            font-size 1.4rem
    .el-dialog
        font-size 2rem
        .el-row
            margin-bottom 2rem

    .main >>> .el-icon-close:before
        font-size 2rem !important

</style>