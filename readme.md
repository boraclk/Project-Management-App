# Başlamadan Önce
* .env.example dosyasını .env olarak kopyalamayı unutmayın.

# Uyulması Gereken Kurallar
* Paket yöneticisi olarak yarn kullanın.
* Gradient bir buton tasarımı varsa bunu resim olarak export etme (Bkz: linear-gradient)
* Componentler reusable olmalı. Yani API, store bağlantısı vs olmamalı. (Bkz: https://www.javascriptstuff.com/component-communication/)
* Responsiveness çok önemli
* Her sınıfın tek bir amacı olmalı. Amacının dışına çıkmamalı. Örneğin Push Notification handle ediyorsanız bunu ayrı bir sınıf içerisinde yapın.
* Store kullanımını suistimal etmeyin. Verileri prop kullanarak child component'a aktarabilirsiniz!
* Res klasörü içerisindeki Color Palette, Font ve Images tanımlamalarını kullanın. Compoenentler içerisinde image require yapmayın!
* Testflight öncesi Info.plist içerisindeki NSPhotoLibraryAddUsageDescription gibi açıklama metinlerinin boş bırakılmadığından emin olunuz.
* `import Button from '../../../components/Button'` gibi kullanımlardan kaçınılmalı onun yerine `import { Button } from '~/components' ` veya `import Button from '~/components/Button' ` kullanılmalıdır.

# UI İpuçları
* IOS cihazlar için StatusBar, çentik boşluğu vermek için SafeAreaView veya react-native-safe-area-view kullanılabilir. 
* Device-Info hasNotch ile çentik boşluğu alınabilir.

# Kurmanız Gerekenler
* [react-native-asset](https://github.com/unimonkiez/react-native-asset) _Assetleri(Font, müzik, resim vs) otomatik olarak xcode ve androide link edilmesinisağlar_
* [fastlane](https://github.com/fastlane/fastlane)

# Kurulu Paketler
* [mobx](https://github.com/mobxjs/mobx) _State yönetimi_
* [mobx-react](https://github.com/mobxjs/mobx-react)
* [apisauce](https://github.com/infinitered/apisauce) _API haberleşmesi için kullanılabilir_
* [react-native-safe-area-view](https://github.com/react-native-community/react-native-safe-area-view)
* [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
* [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
* [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) _Resimleri önbelleğe alır ve daha hızlı yüklenmesini sağlar_
* [react-native-dotenv](https://github.com/zetachang/react-native-dotenv) _Development ve Production configlerini ayırmanızı sağlıyor._
* [react-native-size-matters](https://github.com/nirsky/react-native-size-matters) _Uygulamanın responsive olmasını sağlıyor._
* [react-native-modals](https://github.com/jacklam718/react-native-modals) 

# İhtiyaç Halinde Kurulabilecek Paketler
* [react-native-localization](https://github.com/stefalda/ReactNativeLocalization)_Çoklu dil desteği sağlar_
* [react-native-firebase](https://github.com/invertase/react-native-firebase)
* [lottie-react-native](https://github.com/react-native-community/lottie-react-native)
* [react-native-spinkit](https://github.com/maxs15/react-native-spinkit) _Loading Indicator_
* [react-native-device-info](https://github.com/react-native-community/react-native-device-info)
* [react-native-linear-gradient](https://github.com/react-native-community/react-native-linear-gradient)
* [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) _Daha katı kurallarla model tanımlamaları sağlar._
* [react-native-share](https://github.com/react-native-community/react-native-share)
* [react-native-lightbox](https://github.com/oblador/react-native-lightbox)
* [axios](https://github.com/axios/axios) _API haberleşmesi için kullanılabilir_
* [rn-fetch-blob](https://github.com/joltup/rn-fetch-blob) _Raw dataları (resim, video gibi) indirmek için kullanılabilir_
* [react-native-snap-carousel](https://github.com/archriss/react-native-snap-carousel)
* [react-native-sound](https://github.com/zmxv/react-native-sound#basic-usage)
* [react-native-background-timer](react-native-background-timer) _setTimeout'ın arkaplanda çalışmasını istiyorsanız kullanın_
* [realm](https://realm.io/docs/javascript/latest/) _SQLite alternatifi Veritabanı_
* [typeorm](https://github.com/typeorm/typeorm) _ORM, veritabanı_
* [modalize](https://github.com/jeremybarbet/react-native-modalize)

# Notlar
* react-native-snap-carousel loop özelliği buglu.
* Firebase paketinde size gereken özellikleri aktif ediniz.
* XCode sürümünüzü güncellemek için acele etmeyin. Bazı libraryler yeni çıkan güncel XCode sürümlerinde çalışmayabilir, build alamayabilirsiniz.
* Kullandığınız bir libary de bir bug, veya değiştirmeniz gereken bir şey olursa libraryi fork edip projeye install edebilirsiniz. (Örn `yarn add https://github.com/xxx/yyy` )
