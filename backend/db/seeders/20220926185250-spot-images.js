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
        preview: true
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/fe8efc1921dd3714730ad79bd7532e84-se_extra_large_1500_800.webp",
        preview: true
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/5d77ba30e5a9dfbe303dfa2765a80ae4-se_extra_large_1500_800.webp",
        preview: true
      },
      {
        spotId: 5,
        url: "https://photos.zillowstatic.com/fp/d38697dc6b1f1432b6edf192e1e0c0d5-se_large_800_400.webp",
        preview: true
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
