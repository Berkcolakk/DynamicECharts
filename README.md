
# ECharts Generic

Dinamik bir şekilde chart oluşturmak için yazıldı. Herhangi bir endpoint adresi verilip endpoint adresinden dönen response modelini jsonpath ile belirlediğiniz alanların chart'ı çizmesini sağlıyorsunuz.


## Dağıtım

- "dist" klasörü içerisine build alacaktır.
- dist/index.js dosyasında yer alan if içerisindeki production.min.js satırının kalacağı şekilde düzenlemesi gerek. 
- dist içerisinde yer alan development ve .esm ile alakalı dosyaların hepsi silinecek.

```bash
  npm run build
```
## Chart üzerinde verilmiş parametrelerin kullanıldığı veri seti

```
[
    {
        "id": "urn:ngsi-ld:Indicator:234",
        "type": "Indicator",
        "indicatorGroup": {
            "type": "Property",
            "value": "ISO 37120"
        },
        "indicatorGroupId": {
            "type": "Property",
            "value": 1
        },
        "indicatorSubGroup": {
            "type": "Property",
            "value": "Enerji"
        },
        "indicatorSubGroupId": {
            "type": "Property",
            "value": 4
        },
        "subIndicator": {
            "type": "Property",
            "value": "Isıtma derecesi günleri"
        },
        "subIndicatorId": {
            "type": "Property",
            "value": 234
        },
        "period": {
            "type": "Property",
            "value": "Year"
        },
        "isDeleted": {
            "type": "Property",
            "value": false
        },
        "sources": {
            "type": "Property",
            "value": "TÜİK"
        },
        "category": {
            "type": "Property",
            "value": "profilgösterge"
        },
        "isRequired": {
            "type": "Property",
            "value": false
        },
        "https://uri.etsi.org/ngsi-ld/description": {
            "type": "Property",
            "value": "Gün derceleri, binaların yerel ve bölgesel iklimlerine yanıt olarak enerji taleplerini gösterir. 'Isıtma' gün dereceleri, binaların alan ısıtma gereksinimlerinin bir ölçüsüdür, “soğutma” gün dereceleri ise alan soğutma gereksinimlerinin bir ölçüsüdür.\\n"
        },
        "indicatorRequirement": {
            "type": "Property",
            "value": "\\\"Isıtma gün dereceleri, standart temel hava sıcaklığından ortalama günlük hava sıcaklığının çıkarılmasıyla hesaplanacak ve ardından yıllık toplamı karşılamak üzere yılın her günü için toplanacaktır. Sıcaklık farkı negatif bir sayı ise hesaplamadan çıkarılacaktır. Sonuç, ısıtma derecesi günleri olarak ifade edilecektir.\\n\\nBaz sıcaklık standartları ülkeye göre değişir. Örneğin, Amerika Birleşik Devletleri'nde temel rakam 65 °F iken İngiltere'de 15,5 °C'dir. Raporlama yapan şehirler, ek bilgi olarak temel sıcaklık standartlarını sağlayacaktır.\\n\\nBu belgeyi uygulayanlar, ülkeleri için özel standartta verilen yöntemi ve taban sıcaklığını kullanacaklardır.\\n\\nŞehirler, rapor edilen değerlerin (örneğin havaalanı, şehir merkezi) yerel temsiliyetini iletmek için sıcaklık ölçümlerinin yerini tanımlamalıdır.\\\"\\n"
        },
        "indicatorData": {
            "type": "Property",
            "value": [
                {
                    "Year": 2017,
                    "Month": 0,
                    "TimeStamp": "2023-08-11T11:55:33.5772695+00:00",
                    "inputList": [
                        {
                            "type": "Property",
                            "value": "928",
                            "keyName": "Isitmagundereceleri",
                            "label": " Isıtma gün dereceleri",
                            "unit": "Gün"
                        }
                    ],
                    "formula": [
                        {
                            "type": "Property",
                            "keyName": "Isıtma gun dereceleri",
                            "value": "Isitmagundereceleri",
                            "calculatedResult": 928
                        }
                    ]
                },
                {
                    "Year": 2018,
                    "Month": 0,
                    "TimeStamp": "2023-08-11T11:55:33.5773209+00:00",
                    "inputList": [
                        {
                            "type": "Property",
                            "value": "684",
                            "keyName": "Isitmagundereceleri",
                            "label": " Isıtma gün dereceleri",
                            "unit": "Gün"
                        }
                    ],
                    "formula": [
                        {
                            "type": "Property",
                            "keyName": "Isıtma gun dereceleri",
                            "value": "Isitmagundereceleri",
                            "calculatedResult": 684
                        }
                    ]
                },
                {
                    "Year": 2019,
                    "Month": 0,
                    "TimeStamp": "2023-08-11T11:55:33.5773298+00:00",
                    "inputList": [
                        {
                            "type": "Property",
                            "value": "930",
                            "keyName": "Isitmagundereceleri",
                            "label": " Isıtma gün dereceleri",
                            "unit": "Gün"
                        }
                    ],
                    "formula": [
                        {
                            "type": "Property",
                            "keyName": "Isıtma gun dereceleri",
                            "value": "Isitmagundereceleri",
                            "calculatedResult": 930
                        }
                    ]
                },
                {
                    "Year": 2020,
                    "Month": 0,
                    "TimeStamp": "2023-08-11T11:55:33.5773362+00:00",
                    "inputList": [
                        {
                            "type": "Property",
                            "value": "861",
                            "keyName": "Isitmagundereceleri",
                            "label": " Isıtma gün dereceleri",
                            "unit": "Gün"
                        }
                    ],
                    "formula": [
                        {
                            "type": "Property",
                            "keyName": "Isıtma gun dereceleri",
                            "value": "Isitmagundereceleri",
                            "calculatedResult": 861
                        }
                    ]
                },
                {
                    "Year": 2021,
                    "Month": 0,
                    "TimeStamp": "2023-08-11T11:55:33.5773482+00:00",
                    "inputList": [
                        {
                            "type": "Property",
                            "value": "801",
                            "keyName": "Isitmagundereceleri",
                            "label": " Isıtma gün dereceleri",
                            "unit": "Gün"
                        }
                    ],
                    "formula": [
                        {
                            "type": "Property",
                            "keyName": "Isıtma gun dereceleri",
                            "value": "Isitmagundereceleri",
                            "calculatedResult": 801
                        }
                    ]
                }
            ]
        }
    }
]
```

## Örnek Component Kullanımı

- Burada iki kullanım şekli mevcuttur. xAxisData ve series parametrelerini dolu gönderirseniz dynamicService de gönderdiğiniz endpoint adresine bakmaz ve sadece gönderdiğiniz parametredeki datalar göre çalışacaktır.
```
import { GenericChart } from "lib/dist"


const index = () => {
  return (
    <GenericChart
      chartTitle='Toplam Harcamaların Yüzdesi Olarak Sermaye Harcaması'
      // xAxisData={["2019", "2020", "2021"]}
      // series={[
      //   { name: "test", type: "line", data: [1, 2, 3] },
      //   { name: "test 2", type: "bar", data: [1, 2, 3] }
      // ]}
      dynamicService={{
        dataUrl:
          `${env.API.ORION}ngsi-ld/v1/entities?type=Indicator&limit=1000&q=indicatorSubGroupId==${22};subIndicatorId==${288}`,
        xAxisKeyName: "Year",
        chart: [
          { chartType: "line", dataJson: "formula[0].calculatedResult", keyJson: "formula[0].keyName" },
          { chartType: "line", dataJson: "inputList[0].value", keyJson: "inputList[0].label" },
          { chartType: "line", dataJson: "inputList[1].value", keyJson: "inputList[1].label" }
        ],
        dataPath:"0.indicatorData.value"
      }} 
       refreshRefetchMs={5000}
       textColor="black"
       theme="westeros" />
  )
}
export default index;
```
## Parametreler

 ## dataPath
- dynamicService içerisinde gönderilen dataPath alanı ana verinin hangi json adresinde olduğunu belirtmek için kullanılıyor.
Örnek: dataUrl endpointinden dönen response ana verilerin olduğu yer olmadığı bir json:
```
[{
    "area":"Marmara",
    "locations":[{"name":"Istanbul","population":"123"},{"name":"Yalova","population":"123"},{"name":"Tekirdağ","population":"123"}]
},
{
    "area":"Ege",
    "locations":[{"name":"Izmir","population":"123"},{"name":"Manisa","population":"123"},{"name":"Aydın","population":"123"}]
}]
```
Üstte yer alan bir json'a sahipseniz ve sadece Marmara bölgesini kullanacaksanız dönecek olan verinin [0].locations olarak dataPath'ini set etmeniz gerekmektedir. Bu sayede döngü oluşturulduğu zaman sadece locations içerisinde yer alan verileri döngüye sokacaktır.

Eğer bütün bölgelerin bütün lokasyonlarıyla bir chart oluşturacaksınız dataPath'in boş olması yeterli olacaktır. Bu sayede döngüye aldığı yer en üst array olacağı olacaktır ve toplam 2 kez döngüye girecektir.

## xAxisKeyName

Bu alan veri setine bakıldığı zaman döngünün başladığı için dictionary'de yer alan Year alanıdır.

## dataUrl
GET yapılarak çekilecek verinin endpoint adresidir.

## chart

```
[{ chartType: "line", dataJson: "formula[0].calculatedResult", keyJson: "formula[0].keyName" },
{ chartType: "line", dataJson: "inputList[0].value", keyJson: "inputList[0].label" },
{ chartType: "line", dataJson: "inputList[1].value", keyJson: "inputList[1].label" }]
```



Burada chart üzerinde yer alan series'lerin oluşturulması için bu parametreyi kullanıyoruz. Oluşturacağımız chart tipini bellirtiyoruz, chart üzerindeki değeri ve değerin adını belirtmek için jsonPath kullanıyoruz. Bu jsonPath'i endpointten dönen responsedaki modele uygun olarak veriyoruz.

## refreshRefetchMs 
Verinin yenileneceği milisaniyedir. Default değeri 0 ve yenileme yapmaz.

## textColor 
title alanının hangi renkte görünmesini istediğinizi belirtirsiniz.

## theme 
Örnek Temaların Yüklenmesi bölümünde önceden yüklemiş olduğunuz temaların adlarını burada giriyoruz.

## Örnek Temaların Yüklenmesi
```
import {westeros} from "styles/chartTheme/westeros";
import {test} from "styles/chartTheme/test";
registerThemes({
    themes: [
      { obj: westeros, themeName: "westeros" },
      { obj: test, themeName: "test" }
      ]
  })
```
## Bağımlılıklar

Kütüphanenin kullanıldığı projede olması gereken bağımlılıklar aşağıda yer almaktadır.

- [Apache ECharts](https://echarts.apache.org/en/index.html)
- [echarts-for-react](https://www.npmjs.com/package/echarts-for-react)
- [jsonpath](https://www.npmjs.com/package/jsonpath)
- [swr](https://www.npmjs.com/package/swr)
