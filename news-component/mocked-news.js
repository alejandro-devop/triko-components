export default [
  {
    type: 'new',
    title: '!Bienvenido a Triko!',
    date: '2020-09-13 15:00:00',
    description:
      'Felicidades, has completado exitosamente tu proceso de registro, a partir de ahora puedes buscar trikos, solicitar servicios, ver tu actividad y mucho más.',
    author: {
      user: {
        photo_url:
          'https://user-images.githubusercontent.com/68975668/93027219-2969f000-f5d1-11ea-8a80-5cd36a3db811.png',
      },
      pi: {
        first_name: 'Triko',
      },
    },
    cta: 'requests',
    ctaLabel: 'Busca un triko',
    disableActions: true,
  },
  {
    type: 'recommendation',
    title: 'Recomendación',
    date: '2020-09-13 14:45:00',
    commentsCount: 3,
    description:
      'Recuerden recibir a su triko con tapabocas, manejar una distancia prudente, también el uso de alcohol y antibacterial',
    author: {
      user: {
        photo_url:
          'https://simg.nicepng.com/png/small/856-8561250_profile-pic-circle-girl.png',
      },
      pi: {
        first_name: 'Andrea',
        last_name: 'Marulanda',
      },
    },
  },
  {
    type: 'request',
    title: '',
    description:
      'Contrató a juan Javier Guzman para Limpieza y Servicio Domestico',
    date: '2020-09-13 13:15:00',
    author: {
      user: {
        photo_url: 'https://cxl.com/wp-content/uploads/2016/03/nate_munger.png',
      },
      pi: {
        first_name: 'Javier',
        last_name: 'Guzman',
      },
    },
    request: {
      triko: {
        user: {
          photo_url:
            'https://simg.nicepng.com/png/small/182-1829287_cammy-lin-ux-designer-circle-picture-profile-girl.png',
        },
      },
      rating: 4,
      details: [
        {
          service: {
            icon: null,
            type: {
              icon:
                'https://api-staging.triko.co/storage/applications/service/icons/8d6f42f0-f3de-11ea-bc1e-bf9330e0db3b.png',
            },
          },
        },
      ],
    },
  },
];
