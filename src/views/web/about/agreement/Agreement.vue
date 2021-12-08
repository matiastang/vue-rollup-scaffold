<!--
 * @Author: matiastang
 * @Date: 2021-11-26 13:34:06
 * @LastEditors: matiastang
 * @LastEditTime: 2021-12-08 15:44:10
 * @FilePath: /datumwealth-openalpha-front/src/views/web/about/agreement/Agreement.vue
 * @Description: 用户协议
-->
<template>
    <div class="agreement flexColumnCenter">
        <div class="agreement-title defaultFont">用户协议</div>
        <div class="agreement-content">
            <div class="agreement-content-text">
                欢迎使用西筹基金研究开放平台（以下简称<span class="agreement-text-span"
                    >“开放平台”</span
                >），在您使用开放平台提供的西筹基金数据接口服务（具体形式包括但不限于您获取并使用的数据查询、数据导出、数据接口调用服务，亦包括未来增加或完善现有服务的任何新功能）（以下简称<span
                    class="agreement-text-span"
                    >“开放平台服务”</span
                >）之前，请务必仔细阅读并透彻理解本协议。<span class="agreement-text-span"
                    >您在使用开放平台服务前，应当仔细认真阅读本《用户协议》(以下简称“本协议”)中的全部条款、规则及内容（特别是其中以加粗标示出的关于开放平台服务及用户重大权益的规则，该等规则可能涉及相关方的责任免除或限制、法律适用与争议解决条款，请您重点阅读），确认对本协议全部条款、规则及内容均已知晓、理解并接受，并已同意将其作为确定双方权利义务的依据。如您使用开放平台账号调用开放平台接口或以其他方式使用或接受任何开放平台服务，即视为您已阅读并与开放平台达成协议，自愿接受本协议全部条款、规则及内容的约束。</span
                >所有服务规则视为本条款不可分割的一部分，与本条款具有同等法律效力。
            </div>
            <div class="agreement-content-text">
                本协议的订立双方为开放平台的实际运营商成都西筹金融科技有限公司（以下简称<span
                    class="agreement-text-span"
                    >“西筹金融科技”</span
                >或<span class="agreement-text-span">“我们”</span
                >）与使用开放平台相关服务的使用人（以下简称<span class="agreement-text-span"
                    >“用户”</span
                >或<span class="agreement-text-span">“您”</span
                >），本协议是您与西筹金融科技之间关于您使用开放平台提供的各项服务所订立的服务条款及规则，与正式书面合同具有同等效力。
            </div>
            <div class="agreement-content-text">
                西筹金融科技重视依法保护用户的个人信息，我们将依照本协议及《隐私政策》（链接地址：<span
                    class="agreement-text-span"
                    >【<span class="agreement-content-url" @click="copyrightAction">{{
                        `${host}/#/about/copyright`
                    }}</span
                    >】</span
                >）的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护相关内容未作明确规定的，均应以《隐私政策》的内容为准。
            </div>
            <div class="agreement-content-header">一、用户注册及服务使用</div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">1</span>.<span class="agreement-text-span"
                    >“开放平台账号”</span
                >是指您通过开放平台官方网页端注册的账号。部分开放平台服务，需要您在登录您的开放平台账号之后方可使用。您在注册时所填写的内容与个人资料必须真实、准确、有效，否则开放平台有权拒绝您的注册申请。在完成账号注册手续后，您将有权通过该账号使用开放平台服务。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">2</span>.<span class="agreement-text-span"
                    >您应妥善保管账户、密码、订单编号以及APIKEY信息，由于您自身原因导致的前述信息泄露、遗忘等情形或其他原因所带来的损失，开放平台将配合采取必要措施以降低相关损失，但因此造成的不利后果，需由您自行承担。</span
                >
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">3</span
                >.您在使用开放平台服务时，所发布的信息（包括用户名称、用户头像、社区问答等）及用户行为必须遵守国家有关法律规定、本协议的约定以及开放平台服务规则，并承担一切因自己发布信息或其他行为导致的民事、行政、或刑事法律责任或其他不利后果。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">4</span>.<span class="agreement-text-span"
                    >您在开放平台所发布或展示的信息，不得含有以下内容或用于以下目的：</span
                >
            </div>
            <div class="agreement-content-title">
                （1）违反宪法确定的基本原则的；<br />
                （2）危害国家安全，泄露国家机密，颠覆国家政权，破坏国家统一，损害国家荣誉和利益的；<br />
                （3）煽动民族仇恨、民族歧视，破坏民族团结的； （4）破坏国家、地区间友好关系的；<br />
                （5）违背中华民族传统美德、社会公德、伦理道德、以及社会主义精神文明的；<br />
                （6）破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
                （7）散布谣言或不实消息，扰乱社会秩序，破坏社会稳定的；<br />
                （8）煽动、组织、教唆恐怖活动、非法集会、结社、游行、示威、聚众扰乱社会秩序的；<br />
                （9）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br />
                （10）侮辱或诽谤他人，侵犯他人肖像权、姓名权、名誉权、隐私权或其他人身权利的；<br />
                （11）以非法组织名义活动的； （12）侵犯他人知识产权、商业秘密等合法权益的；<br />
                （13）含有违反法律、法规、国家政策及公序良俗的法律、行政法规禁止的其他内容的。<br />
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">5</span
                >.您不得为任何非法目的使用开放平台服务，且不得在未经开放平台事先书面允许的情况下，以任何形式利用或借助开放平台从事以下活动：<br />
                （1）进入开放平台或其他计算机信息网络或者使用计算机信息网络资源；<br />
                （2）对开放平台或其他计算机信息网络功能进行删除、修改或者增加；<br />
                （3）进入计算机信息网络中对存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；<br />
                （4）制作、传播计算机病毒（包括木马）等破坏性程序；<br />
                （5）通过爬虫工具、机器人软件等手段获取开放平台服务或有关数据信息；<br />
                （6）其他危害计算机信息网络安全的行为。<br />
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">6</span>.<span class="agreement-text-span"
                    >您在使用开放平台服务时存在违反法律、法规、规章或监管部门规范性文件规定的情形，或使用开放平台服务时侵犯第三方的合法权益，或利用开放平台服务从事任何侵犯第三方合法权益的行为，从而导致西筹金融科技开放平台承担任何性质的赔偿、补偿或罚款而遭受损失的，您应当赔偿西筹金融科技因此遭受的全部损失（为避免疑义，包括间接损失）。</span
                >
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">7</span>.<span class="agreement-text-span"
                    >依照监管要求，对于开放平台在向您提供服务时向您提供的及/或您在使用开放平台服务时获取的数据及服务信息等，您应当仅在中华人民共和国大陆范围内储存及/或使用，同时您不得利用开放平台提供的数据及服务信息从事任何违反法律、法规或其他监管政策的行为。否则，由此产生的一切不利法律后果由您自行承担，且您应全额赔偿西筹金融科技开放平台因此遭受的商誉、企业形象等损失。</span
                >
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">8</span>.<span class="agreement-text-span"
                    >您不得以营利为目的，将您在使用开放平台服务时获得的服务信息或该服务自身向第三方出售或以其他形式提供（包括但不限于您的子公司、您的控股公司、您的参股公司等关联企业以及您的客户、您的供应商等）。否则，西筹金融科技有权停止向您提供开放平台服务，且您应支付相当于您因前述行为所获利益的违约金并全额赔偿西筹金融科技因此遭受的损失。</span
                >
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">9</span
                >.您在使用开放平台服务时，与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由您自行负担。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">10</span>.实名认证：<br />
                为了您的账户和交易安全合规，西筹金融科技有权要求用户完成开放平台账户的实名认证，认证类型分为个人认证和企业认证。实名认证的相关规则应以《开放平台企业认证服务协议》为准（（链接地址：
                <span class="agreement-text-span"
                    >【<span class="agreement-content-url" @click="authProtocolAction">{{
                        `${host}/#/about/authProtocol`
                    }}</span
                    >】</span
                >）。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">11</span>.<span class="agreement-text-span"
                    >API</span
                >服务：<br />
                （1）用户可以使用各类<span class="agreement-text-span">API</span
                >服务和数据资源，详细可参考相应的接口说明页；<br />
                （2）不同的<span class="agreement-text-span">API</span
                >有不同的收费价格，详细信息可以在对应的接口文档上进行查看；<br />
                （3）所有数据请求均基于正常的请求，而非恶意请求、爬取西筹金融科技数据等，西筹金融科技有权对此进行判定；<br />
                （4）在运营期间，西筹金融科技有权对数据资费、接口的服务等进行相应的调整，并在对应的接口文档上或公告上进行显示或公布。<br />
                （5）如西筹金融科技所提供的<span class="agreement-text-span">API</span
                >接口种类或<span class="agreement-text-span">API</span
                >返回格式等不能满足您的需求，您可以联系西筹金融科技进行专属数据定制服务，根据<span
                    class="agreement-text-span"
                    >API</span
                >的不同，我们可能对定制服务收取相应的收费，西筹金融科技有权对您提出的定制化接口按西筹金融科技标准评估相应费用。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">12</span
                >.开放平台将通过后台管理系统对您账户内的余额及套餐次数的使用情况进行自动记账。余额及套餐次数根据查询量变化实时更新，余额及套餐次数扣除明细将于使用开放平台的次日更新。如您对结果有异议的，应当于余额及套餐次数扣除明细更新后的三（3）日内书面告知开放平台，由开放平台及用户双方进行核对。您未及时提出异议的，视为认可西筹基金开放平台后台记录结果。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">13</span
                >.您查询/调用开放平台的频次每日上限默认为5000次。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">14</span
                >.开放平台可能会不定期的向用户提供优惠套餐，优惠套餐是指一定期限内包含一定使用次数的套餐。如您使用开放平台提供的优惠套餐，套餐次数用尽时服务期限提前届满；服务期限届满时套餐次数清零。
            </div>
            <div class="agreement-content-header">二．知识产权归属</div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">1</span
                >.除非西筹金融科技另行声明，开放平台的所有技术、软件、程序、数据及其他信息（包括但不限于文字、图像、图表、版面设计、电子文档）的所有知识产权（包括但不限于版权、商标权、专利权、商业秘密）及相关权利，均归西筹金融科技所有。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">2</span
                >.未经西筹金融科技书面授权许可，任何人不得擅自（包括但不限于：以不合理或不合法的方式抓取、复制、传播、展示、镜像、上载、下载、非通过西筹金融科技购买）获取或使用开放平台的数据、信息和资料，或通过不当方式影响开放平台的正常服务，任何人不得擅自以软件程序自动获得开放平台的数据。否则，西筹金融科技将依法追究法律责任。
            </div>
            <div class="agreement-content-header">三、免责条款</div>
            <div class="agreement-content-title">
                1.开放平台对由于用户不正当使用本应用服务、或依据开放平台提供的信息进行交易引起的对任何第三方的损害不承担任何赔偿责任；<br />
                2.若开放平台已经明示其所提供的API服务方式发生变更并提醒用户应当注意事项，用户未按要求操作所产生的一切后果由用户自行承担；<br />
                3.由于政府禁令、现行生效的适用法律或法规的变更、火灾、地震、瘟疫、战争、停电、通讯线路中断、电信部门技术调整、因政府管制而造成网站的暂时性关闭等其他任何影响网络正常运营的不可预见、不可避免、不可克服和不可控制的事件（“不可抗力事件”）；以及他人蓄意破坏，黑客攻击、计算机病毒，系统维护、系统升级，网络过载等技术问题（“技术事件”）而导致本网站不能访问而造成的本站所提供的信息及数据的延误、停滞或错误，西筹金融科技无须承担责任。同时，西筹金融科技承诺将不断完善技术设施与条件，尽最大努力避免技术事件的发生，在不可抗力事件或技术事件发生时，在条件允许的前提下尽最大努力修复，以确保您继续正常使用，最大程度地避免您的损失；<br />
                4.用户确认其知悉由于您将注册账户告知他人或与他人共享注册账户，由此导致的任何个人信息的泄漏，或其他非因开放平台或西筹金融科技的原因导致的个人信息泄漏，西筹金融科技对此不承担责任；<br />
                5.请您知悉并同意，由于开放平台服务的互联网服务性质，在服务的各个环节中不可避免地会受到相关不确定因素的影响（如电信运营商、网络质量、您使用的设备型号及系统、您的地理位置等），由于前述不确定因素造成您无法正常使用开放平台服务的，西筹金融科技无须承担任何责任。同时，西筹金融科技承诺将在技术条件允许范围内尽最大努力为您解决，以确保您能够正常使用。<br />
            </div>
            <div class="agreement-content-header">四、协议的变更</div>
            <div class="agreement-content-text">
                您知悉并同意，在监管要求更新或业务调整等原因下，我们可能会单方修订本协议部分条款。若有重大修订，我们会通过消息推送或其他显著方式向您发出通知，您可以查阅最新版本的协议条款，修订后的协议将在通知发出之日起生效。本协议条款修订后，如果您继续使用开放平台服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用开放平台服务。
            </div>
            <div class="agreement-content-header">五、争议解决及其他</div>
            <div class="agreement-content-title">
                1.本协议的成立、生效、履行、解释及争议解决，应适用中华人民共和国大陆地区法律（为避免疑义，不包括冲突法）。
            </div>
            <div class="agreement-content-title">
                2.若您就本协议或在使用开放平台服务过程中与西筹金融科技之间发生任何纠纷或争议，首先应友好协商解决；一方以书面形式的协商意见发出之日起三十（30）日后，双方仍未就争议解决方案达成一致的，应将该争议提交成都西筹金融科技有限公司所在地有管辖权的人民法院诉讼解决。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">3</span
                >.本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">4</span
                >.本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。
            </div>
            <div class="agreement-content-text">
                <span class="agreement-text-span">5</span
                >.当您采用纸质合同、订货单或其他纸质文件（以下统称“纸质合同”）的形式购买开放平台服务时，您亦获得开放平台用户身份，享有本协议项下的权利，并应履行本协议项下的义务。纸质合同未尽事宜，以本协议规定为准。
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'Agreement',
    setup() {
        const router = useRouter()
        const host = ref(window.location.host)
        const copyrightAction = () => {
            router.push({
                path: '/about/copyright',
            })
        }
        const authProtocolAction = () => {
            router.push({
                path: '/about/authProtocol',
            })
        }
        return {
            host,
            copyrightAction,
            authProtocolAction,
        }
    },
})
</script>

<style lang="scss" scoped>
.agreement {
    width: 100%;
    height: 100%;
    padding: 20px 16px;
    box-sizing: border-box;
    background: $themeBgColor;
    justify-content: flex-start;
    .agreement-title {
        width: 100%;
        height: 42px;
        font-size: fontSize(18px);
        color: $titleColor;
        line-height: 26px;
        text-align: left;
        border-bottom: 1px solid #dfdfdf;
    }
    .agreement-content {
        width: 100%;
        box-sizing: border-box;
        .agreement-content-header {
            @include defaultFontMedium;
            width: 100%;
            font-size: fontSize(16px);
            line-height: lineHeight(16px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
        }
        .agreement-content-title {
            @include defaultFontMedium;
            width: 100%;
            font-size: fontSize(14px);
            line-height: lineHeight(14px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
        }
        .agreement-content-text {
            @include defaultFont;
            width: 100%;
            font-size: fontSize(14px);
            line-height: lineHeight(14px);
            color: $titleColor;
            text-align: left;
            margin: 10px 0px;
            .agreement-text-span {
                font-size: fontSize(14px);
                line-height: lineHeight(14px);
                color: $titleColor;
                @include defaultFontMedium;
            }
        }
        :deep(.agreement-content-url) {
            color: #4e9aeb;
            font-size: fontSize(14px);
            line-height: 20px;
            cursor: pointer;
        }
    }
}
</style>
