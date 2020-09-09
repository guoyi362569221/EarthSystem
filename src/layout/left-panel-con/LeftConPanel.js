import {utils} from "../../utils/utils";
import {dateUtils} from "../../utils/dateUtils";

export default {
    components: {},
    props: {},

    data() {
        return {
            name: '',
            pol: "pm2.5",
            pType: "",
            pLevel: "Ⅲ",
            desc: '',
            pols: [
                {
                    "label": "PM₂.₅",
                    "value": "pm2.5"
                },
                {
                    "label": "PM₁₀",
                    "value": "pm10"
                },
                {
                    "label": "O₃",
                    "value": "o3"
                },
                {
                    "label": "O₃_8h",
                    "value": "o3_8h"
                },
                {
                    "label": "NO₂",
                    "value": "no2"
                },
                {
                    "label": "SO₂",
                    "value": "so2"
                },
                {
                    "label": "CO",
                    "value": "co"
                }
            ],
            pTypes: [
                {
                    "label": "未判定",
                    "value": ""
                },
                {
                    "label": "污染传输影响型",
                    "value": "污染传输影响型"
                },
                {
                    "label": "不利气象条件型",
                    "value": "不利气象条件型"
                },
                {
                    "label": "沙尘传输污染型",
                    "value": "沙尘传输污染型"
                },
                {
                    "label": "传输和累计双重型",
                    "value": "传输和累计双重型"
                },
                {
                    "label": "夏季臭氧污染型",
                    "value": "夏季臭氧污染型"
                },
                {
                    "label": "其他污染特征型",
                    "value": "其他污染特征型"
                }
            ],
            pLevels: [
                {
                    "label": "轻度污染",
                    "value": "Ⅲ"
                },
                {
                    "label": "中度污染",
                    "value": "Ⅳ"
                },
                {
                    "label": "重度污染",
                    "value": "Ⅴ"
                },
                {
                    "label": "严重污染",
                    "value": "Ⅵ"
                }
            ],
            canSave: true,

            edDate: new Date(),
            stDate: new Date(),
            isEdit: true,

            stPickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },

            edPickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },

    methods: {
        toggleMenu() {
            this.$store.dispatch(this.$store.state.caseLeftMenu.menu_flag ? 'set_case_menu_close' : 'set_case_menu_open');
            this.$root.eventBus.$emit('toggleMenu');
        },
        goBackTo() {
            this.$store.dispatch('remove_libinfo');
            this.$router.push('/case');
        },


        stDateChange(date) {
            let stDateStr = dateUtils.dateToStr('yyyyMMdd', date);
            this.edPickerOptions = {
                disabledDate(time) {
                    return time.getTime() <= date;
                }
            }
        },

        edDateChange(date) {
            this.stPickerOptions = {
                disabledDate(time) {
                    return time.getTime() >= date;
                }
            }
        },

        onLevelChange(level) {
            let stDateStr = dateUtils.dateToStr('yyyyMMdd', this.stDate);
        },
        setEmpty(){
          this.desc="";
        }
    },

    created() {



    },

    mounted() {

    },

    activated() {

      this.$nextTick(()=>{


        if (this.$store.state.lib.libInfos) {
            let _pol=this.$store.state.lib.libInfos.pol;
            if(_pol){
              _pol = _pol.toLowerCase();
              if (_pol === 'pm25' || _pol === 'pm2.5') {
                _pol = "pm2.5";
              }
            }
            // let tmpPol = this.$store.state.lib.libInfos.pol.toLowerCase()==='pm25'?'pm2.5':this.$store.state.lib.libInfos.pol;
            this.canSave = true;
            this.name = this.$store.state.lib.libInfos.name || '';
            this.pol = _pol || '';
            this.pType = this.$store.state.lib.libInfos.pollution_type || this.pType;

            this.pLevel = this.$store.state.lib.libInfos.level || '';
            this.isEdit = !this.$store.state.lib.libInfos.isDelete;
            this.desc = this.$store.state.lib.libInfos.desc;

            if (this.$store.state.lib.libInfos.starttime)
                this.stDate = dateUtils.strToDate(this.$store.state.lib.libInfos.starttime + ' 00:00:00');
            if (this.$store.state.lib.libInfos.endtime)
                this.edDate = dateUtils.strToDate(this.$store.state.lib.libInfos.endtime + ' 00:00:00');
        }
        else {
            this.$router.push('/case');
            this.canSave = false;
        }
      })



    }
}
