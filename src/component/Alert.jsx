import {
    Modal
} from "antd"

const success = (text) =>{
    Modal.success({
        title: "提示",
        content: text
    })
}

const error = (text) =>{
    Modal.error({
        title: "提示",
        content: text
    })
}

const warning = (text) =>{
    Modal.warning({
        title: "提示",
        content: text
    })
}
export {success, error, warning} 