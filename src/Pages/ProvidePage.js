import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Small-Elements/Header";
import Introduction from "../Small-Elements/Introduction";
export const url = 'https://saving-document-app-servers.onrender.com'

function ProvidePage() {
    let [showItem, setShowItem] = useState(false)
    let [itemList, setItemList] = useState([])
    let [filterList, setFilterList] = useState([])
    let [itemId, setItemId] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [actName, setActName] = useState('')
    const [actText, setActText] = useState('')
    const [actImgs, setActImgs] = useState('')
    const [mediaUrl, setMediaUrl] = useState('')
    const [actBrief, setActBrief] = useState('')
    const [actAssessment, setActAssessment] = useState('')
    const [form, setForm] = useState('')
    const [interactionNum, setInteractionNum] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(url + '/get-item')
            .then(res => {
                itemId = res.data[0]._id
                setItemId(itemId)
                itemList = res.data[0].itemList
                setItemList(itemList)
                console.log(itemList)
            })
            .catch(err => console.log(err))
    }, [])
    const saveInfo = async () => {
        await axios.post(url, { actName, actText, actImgs, mediaUrl, actBrief, actAssessment, form, interactionNum, startDate, endDate, filterList })
            .then(result => {
                console.log(result)
                if (result) {
                    navigate('/saving-page')
                }
            })
            .catch(err => console.log(err))
    }
    const deleteItem = async (name) => {
        const deleteResult = itemList?.filter((item, index) => {
            return item.name != name
        })
        itemList = deleteResult
        setItemList(itemList)
        await axios.post(url + '/delete-item', { itemId, itemList })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }
    const chosenItem = async (itemIndex) => {
        const filterChosen = itemList.map((item, index) => {
            if (itemIndex == index) {
                return { ...item, chose: item.chose == true ? false : true }
            } else {
                return item
            }
        })
        itemList = filterChosen
        setItemList(itemList)


    }
    const filterChosenItems = () => {
        const filterAct = itemList.map((item, index) => {
            if (item.chose == true) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == false) {
                    return filterList = [...filterList, `${item.name}`]
                }

            } else if (item.chose == false) {
                const checkRemoveItem = filterList.some((item2, index) => {
                    return filterList[index] == item.name
                })
                if (checkRemoveItem == true) {
                    const removeIndex = filterList.indexOf(item.name)
                    setFilterList(filterList.splice(removeIndex, 1))
                }
            }
        })
        setFilterList(filterList)
        console.log(filterList)
        saveInfo()
    }
    return (
        <div className="provide_page_layout">
            <Header />
            <Category showItem={showItem} setShowItem={setShowItem} itemList={itemList} deleteItem={deleteItem} chosenItem={chosenItem} filterChosenItems={filterChosenItems} />

            <div className="center">
                <div className="input_place_1">
                    <label for='title'>Tên hoạt động</label>
                    <input id="title" type="text" className="activity_input" onChange={(e) => setActName(e.target.value)} placeholder="Nhập nội dung" />
                </div>

                <div className="input_place_1">
                    <label for='actText'>Văn bản</label>
                    <input id="actText" type="text" className="activity_input" onChange={(e) => setActText(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='imgs'>Hình ảnh </label>
                    <input id="imgs" type="text" className="activity_input" onChange={(e) => setActImgs(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='mediaurl'>Link truyền thông</label>
                    <input id="mediaurl" type="text" className="activity_input" onChange={(e) => setMediaUrl(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='brief'>Tóm tắt hoạt động</label>
                    <input id="brief" type="text" className="activity_input" onChange={(e) => setActBrief(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='assessment'>Đánh giá hoạt động</label>
                    <input id="assessment" type="text" className="activity_input" onChange={(e) => setActAssessment(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='form'>Hình thức</label>
                    <input id="form" type="text" className="activity_input" onChange={(e) => setForm(e.target.value)} placeholder="Nhập nội dung" />
                </div>



                <div className="input_place_1">
                    <label for='reaction'>Lượt tương tác</label>
                    <input id="reaction" type="text" className="activity_input" onChange={(e) => setInteractionNum(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='startdateF'>Ngày bắt đầu</label>
                    <input id="startdate" type="text" className="activity_input" onChange={(e) => setStartDate(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div className="input_place_1">
                    <label for='enddate'>Ngày kết thúc</label>
                    <input id="enddate" type="text" className="activity_input" onChange={(e) => setEndDate(e.target.value)} placeholder="Nhập nội dung" />
                </div>
                <div style={{ paddingTop: '10px' }}> <button className="save_button" onClick={() => setShowItem(true)}>Lưu</button></div>

            </div>
            <Introduction />
        </div >
    );
}
export const Category = ({ showItem, setShowItem, itemList, deleteItem, chosenItem, filterChosenItems }) => {
    return (
        <div>
            {showItem == true && <div className="choose_item_place">
                <div className="off_item" onClick={() => setShowItem(false)}>X</div>
                <div className="choose_item_title">Chọn mục</div>
                <div className="item_list">
                    {itemList?.map((item, index) => {
                        return (
                            <div className="item_detail">
                                <div className="item_title">{index + 1}. {item.name}</div>
                                <button className="delete_item" onClick={() => deleteItem(item.name)}>Xóa</button>
                                {item.chose == false ? <div className="chosen_item_x" onClick={() => chosenItem(index)}></div> : <div className="chosen_item_y" onClick={() => chosenItem(index)}>✔</div>}

                            </div>
                        )
                    })}
                    <div className="filter_button_place"><button className="filter_button" onClick={() => filterChosenItems()}>Lưu</button></div>
                </div>
            </div>}
        </div>
    )
}
export default ProvidePage