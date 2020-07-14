import React from "react";
import {
    Upload,
    Modal,
    message
} from "antd";
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        console.log(reader, "--------------------reader");

        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


class UploadImg extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
        noShowDetFileList: [],
        noShowFileList: [],
        detaileFileList: [],
        showUploadList: true,
        imageUrl: "",
        proLable: this.props.proLable
    }
    constructor(props) {
        super(props)
    }

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }

    deleteErrorFile = (fileList, noshowList) => {
        for (let i = 0; i < fileList.length; i++) {
            for (let j = 0; j < noshowList.length; j++) {
                if (fileList[i].uid === noshowList[j].uid) {
                    fileList.splice(i, 1);
                }
            }
        }
        return fileList
    }

    handleChange = (file) => {

        let { noShowFileList, noShowDetFileList, proLable, showUploadList } = this.state;
        const { fileList } = file;
        //  如果是错的不显示
        if (proLable === "proImg") {
            let newFileList = this.deleteErrorFile(fileList, noShowFileList);
            this.setState({ fileList: newFileList });
        } else {
            let newFileDetList = this.deleteErrorFile(fileList, noShowDetFileList);
            this.setState({ detaileFileList: newFileDetList });
        }
        this.setState({
            showUploadList
        })
    }

    handleCancel = () => this.setState({ previewVisible: false });

    beforeUpload = (file) => {
        let { noShowFileList, proLable, noShowDetFileList } = this.state;
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJpgOrPng) {
            message.error('图片格式为 JPG 或 PNG!');
        }
        //  产品图片限制大小，详情图不限制大小
        if (proLable === "proImg") {
            if (!isLt2M) {
                message.error('图片最大为5M!');
            }
            if (isJpgOrPng === false || isLt2M === false) {
                noShowFileList.push(file);
                this.setState({
                    noShowFileList,
                });
            }
        } else {
            if (isJpgOrPng === false) {
                noShowDetFileList.push(file);
                this.setState({
                    noShowDetFileList,
                })
            }
        }
        this.setState({
            showUploadList: false
        });
        this.setState(state => {
            this.props.getProImgData([...state.fileList, file]);
        })
        return false;
    }

    render() {

        const { previewVisible, previewImage, fileList, previewTitle, showUploadList, detaileFileList, proLable } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">添加图片</div>
            </div>
        );
        return (
            <> <Upload
                listType="picture-card"
                onPreview={this.handlePreview}
                showUploadList={showUploadList}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                fileList={proLable === "proImg" ? fileList : detaileFileList}
            >
                {fileList.length >= 5 ? null : uploadButton}
            </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                {
                    proLable === "proImg" ?
                        <p className="upImgformart">  建议尺寸：800*800，JPG、PNG。小于5M。您可以拖曳图片调整顺序，最多上传5张 </p>
                        :
                        <p className="upImgformart">您可以拖曳图片调整顺序，最多上传5张</p>
                }
            </>
        )
    }
}

export default UploadImg