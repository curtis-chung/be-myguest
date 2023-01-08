'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("SpotImages", [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-655057865614543377/original/467d1aaf-78cd-4f9d-902b-d13bf82e1db6.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/03199e56d21054157cae59b23c456e0b-se_extra_large_1500_800.webp",
        preview: true
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/5c1803a024c9e301241891a8413c4a4f-se_extra_large_1500_800.webp",
        preview: true
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/2cd93a5e1abcb97f05ca1f486a9c3f4e-se_large_800_400.webp",
        preview: true
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/f3ccac9ca8c5d46f0f742880049872c2-se_extra_large_1500_800.webp",
        preview: true
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-655057865614543377/original/79fa4003-c225-4101-80fb-fbe60a5a1086.jpeg?im_w=1440",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-655057865614543377/original/57afd505-0cba-40bc-b71b-1a3a271dd2f7.jpeg?im_w=1440",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-655057865614543377/original/497cb88b-1fb6-404a-9c4f-edbb42cd386a.jpeg?im_w=1440",
        preview: false
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-655057865614543377/original/2d64de73-0205-43a7-a424-6e4769b3f659.jpeg?im_w=1440",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/acd654d5e68099ecdc187f7acf369412-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/9c4373ee2f568c119015fca56cfa038e-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/4c7489ddd5a7f7d71c1fea6b3d168d19-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "https://photos.zillowstatic.com/fp/6327e2b385af47a2dc2e8a09648b73ca-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/5335264d637a4533c60c40d5d6bf7ece-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/5dc0e00e297e60f34ee66a4a9fcd28e3-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/93ca844f89bb014609859a5b865b6ae2-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 3,
        url: "https://photos.zillowstatic.com/fp/e791c2f112cf615380f492dd49a50dd5-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/330db3f63e1053db15d01591437090fc-se_large_800_400.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/df157f346f229c25357594d627b49cf0-se_large_800_400.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/c8f039dd35c761f115e0b79e5f6fefb3-se_large_800_400.webp",
        preview: false
      },
      {
        spotId: 4,
        url: "https://photos.zillowstatic.com/fp/2035f79db5967d541df3f1285681e31b-se_large_800_400.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/89069735443aad91117413b8dc40435c-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/fe8efc1921dd3714730ad79bd7532e84-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/5d77ba30e5a9dfbe303dfa2765a80ae4-se_extra_large_1500_800.webp",
        preview: false
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/d38697dc6b1f1432b6edf192e1e0c0d5-se_large_800_400.webp",
        preview: false
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/55b82407f06c7a729bddf0505998345c-cc_ft_1536.webp",
        preview: true
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/ddd1c53bec0160e237ff19b8451db848-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/64619b6aebef4f4aa51b22e01b68c3ae-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/67818f143f709b8c04c3a2e16eb856e0-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 6,
        url: "https://photos.zillowstatic.com/fp/028792d85674c754c69b6a2cc6362eb0-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/cf0aee8bf42f59663985b836d69b6243-cc_ft_1536.webp",
        preview: true
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/fe93bdaa369cc50804edbb25101789c2-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/b84ad1617cf8663946ed7eb2e389832e-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/20376d1eb908a5e9cc16d62579666206-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 7,
        url: "https://photos.zillowstatic.com/fp/a5dfcaec2119410b3c88a1f118643f24-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/5a1cfa4e83f0c36fa4a5ad8887a707e6-cc_ft_1536.webp",
        preview: true
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/e1f8bf2cb6b683ee9677f52ada68f580-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/4caa82cf9abdcd7cbe967a26136e6ab7-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/2846774a0e3df8d8e18e33128952a08b-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 8,
        url: "https://photos.zillowstatic.com/fp/b81a93df734e22019a7e7be3ddc39da6-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/98e094e12378d20a457b31a1fd082b6f-cc_ft_1536.webp",
        preview: true
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/e30ede04eecf802996d00dff5990c6c7-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/5225bd76d47c672921c64a6b427bc242-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/98b839b910de329a9f3ae33bfb64146f-cc_ft_384.webp",
        preview: false
      },
      {
        spotId: 9,
        url: "https://photos.zillowstatic.com/fp/7f609bfd1567614b48e191f11a39bcbb-cc_ft_384.webp",
        preview: false
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("SpotImages", null, {});
  }
};
