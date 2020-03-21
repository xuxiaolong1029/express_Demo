<template>
    <div class="nuclear-page" :style="{minHeight:(Height-110)+'px'}">
      <div class="goBack" >
        <router-link tag="p" to="/">
          <i class="el-icon-arrow-left"></i>{{$t('lang.nuclear155')}}
        </router-link>
      </div>
      <div class="nuclear-introduce">
        <h2>{{$t('lang.nuclear080')}}</h2><!--玩法介绍-->
        <div class="introduce">
          <h3>{{listenLang==='en_US'?'Ⅰ.':'一、'}}{{$t('lang.nuclear081')}}</h3>
          <p>{{listenLang==='en_US'?'(Ⅰ).':'（一）'}}{{$t('lang.nuclear154')}}</p>
          <p>{{listenLang==='en_US'?'(Ⅱ).':'（二）'}}{{$t('lang.nuclear068')}}</p>
          <p style="margin-top: 10px;">{{$t('lang.pec059')}}：</p>
          <p>{{$t('lang.nuclear024')}}</p>
          <p style="margin-top: 10px;">{{$t('lang.nuclear025')}}</p>
          <p>{{$t('lang.nuclear030')}}</p>
          <p>{{$t('lang.nuclear035')}}</p>
          <p>{{$t('lang.nuclear135')}}</p>
        </div>
        <div class="introduce">
          <h3>{{listenLang==='en_US'?'Ⅱ.':'二、'}}{{$t('lang.nuclear153')}}</h3>
          <p>{{$t('lang.nuclear028')}}</p>
          <p style="margin-top: 10px">{{$t('lang.nuclear111')}}</p>
          <p>{{$t('lang.nuclear031')}}</p>
          <p style="margin-top: 10px;">{{$t('lang.nuclear025')}}</p>
          <p>{{$t('lang.nuclear026')}}</p>
          <p>{{$t('lang.nuclear027')}}</p>
        </div>
        <div class="introduce">
          <h3>{{listenLang==='en_US'?'Ⅲ.':'三、'}}{{$t('lang.nuclear083')}}</h3>
          <div>
            <p>{{$t('lang.nuclear084')}}</p>
            <p>{{listenLang==='en_US'?'1.':'1、'}}{{$t('lang.nuclear085')}}</p>
            <p>{{listenLang==='en_US'?'2.':'2、'}}{{$t('lang.nuclear086')}}</p>
            <p class="img">
              <img :src='"./img/rank-"+listenLang+".png"' alt="" width="335">
            </p>
          </div>
          <div>
            <p>{{listenLang==='en_US'?'Ⅱ.':'二、'}}{{$t('lang.nuclear109')}}</p>
            <h4>{{listenLang==='en_US'?'1.':'1、'}}{{$t('lang.nuclear013')}}</h4>
            <p>{{$t('lang.nuclear110')}}</p>
            <p>{{$t('lang.nuclear101')}}</p>
            <p>{{$t('lang.nuclear102')}}</p>
            <p>{{$t('lang.nuclear103')}}</p>

            <p style="margin-top: 10px;">{{$t('lang.nuclear111')}}</p>
            <p>{{$t('lang.nuclear112')}}</p>
            <p style="margin-top: 10px;">{{$t('lang.nuclear025')}}</p>
            <p>{{$t('lang.nuclear136')}}</p>
            <h4>{{listenLang==='en_US'?'2.':'2、'}}{{$t('lang.nuclear014')}}</h4>

            <p>{{$t('lang.nuclear104')}}</p>
            <p>{{$t('lang.nuclear105')}}</p>
            <p>{{$t('lang.nuclear106')}}</p>
            <p style="margin-top: 10px;">{{$t('lang.nuclear025')}}</p>
            <p>{{$t('lang.nuclear136')}}</p>
            <h4>{{listenLang==='en_US'?'3.':'3、'}}{{$t('lang.nuclear015')}}</h4>
            <p>{{$t('lang.nuclear107')}}</p>
            <p>{{$t('lang.nuclear108')}}</p>
            <p style="margin-top: 10px;">{{$t('lang.nuclear025')}}</p>
            <p>{{$t('lang.nuclear136')}}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {}
</script>
<style>
  #app{
    background-color:#151836;
  }
</style>
<style scoped lang="scss">
  .nuclear-page{
    background-color:#151836;width:100%;padding-bottom: 60px;min-height: 1000px;
    .goBack{
      background: #151836;height:50px;line-height:50px;
      p{
        width: 1194px;margin: auto;color: #fff;font-size: 16px;cursor: pointer;border-bottom: 1px solid #000;
      }
    }
    .nuclear-introduce{
      width: 1194px;margin: auto;position: relative;color: rgba(255,255,255,.7);background-color: #151836;padding-top:20px;
      h2{
        font-size:18px;color:rgba(255,255,255,1);
      }
      .introduce{
        color:rgba(255,255,255,.7);
        h3{
          font-size: 16px;line-height:40px;margin-top: 10px;
        }
        h4{
          font-size: 16px;line-height:35px;margin-top:2px;
        }
        p{
          font-size: 14px;line-height:22px;
        }
        .plate{
          margin-left: 30px;font-weight: bold;color: #bbb;
        }
        .img{
          margin:10px 10px;
        }
      }
    }
  }
</style>
