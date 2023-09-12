export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-6 right-6 z-40"
      aria-label="Chat on WhatsApp"
    >
      <button
        class="relative text-white rounded-full shadow-lg border-2 border-[#48EB6C] items-center justify-center flex"
        aria-label="Chat on WhatsApp"
      >
        <div class="w-full h-full p-[14px] rounded-full shadow-lg border-2 bg-[#16C53A] border-[#16C53A] items-center justify-center flex transition duration-300 ease-in-out hover:border-[#48EB6C] hover:bg-[#129e2e]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 42 42"
            fill="none"
          >
            <path
              d="M21.002 3.5C30.6672 3.5 38.502 11.3348 38.502 21C38.502 30.6652 30.6672 38.5 21.002 38.5C17.9093 38.505 14.8711 37.6865 12.1995 36.1287L3.50898 38.5L5.87498 29.806C4.31589 27.1335 3.49681 24.094 3.50198 21C3.50198 11.3348 11.3367 3.5 21.002 3.5ZM15.038 12.775L14.688 12.789C14.4614 12.8028 14.2399 12.8623 14.037 12.964C13.8471 13.0715 13.6738 13.2059 13.5225 13.363C13.3125 13.5608 13.1935 13.7323 13.0657 13.8985C12.4184 14.7401 12.0699 15.7733 12.0752 16.835C12.0787 17.6925 12.3027 18.5273 12.6527 19.3077C13.3685 20.8862 14.5462 22.5575 16.1002 24.1062C16.4747 24.479 16.8422 24.8535 17.2377 25.2017C19.1687 26.9018 21.4697 28.1278 23.9577 28.7823L24.9517 28.9345C25.2755 28.952 25.5992 28.9275 25.9247 28.9118C26.4344 28.8854 26.9321 28.7474 27.3825 28.5075C27.6116 28.3895 27.8353 28.261 28.0527 28.1225C28.0527 28.1225 28.128 28.0735 28.2715 27.965C28.5077 27.79 28.653 27.6658 28.849 27.461C28.9942 27.3105 29.1202 27.1338 29.2165 26.9325C29.353 26.6473 29.4895 26.103 29.5455 25.6497C29.5875 25.3032 29.5752 25.1143 29.57 24.997C29.563 24.8098 29.4072 24.6155 29.2375 24.5333L28.219 24.0765C28.219 24.0765 26.6965 23.4132 25.7655 22.9897C25.6681 22.9472 25.5637 22.9229 25.4575 22.918C25.3377 22.9057 25.2168 22.9192 25.1027 22.9575C24.9886 22.9958 24.884 23.0582 24.796 23.1402C24.7872 23.1367 24.67 23.2365 23.4047 24.7695C23.3321 24.8671 23.2321 24.9408 23.1174 24.9813C23.0027 25.0219 22.8785 25.0273 22.7607 24.997C22.6467 24.9664 22.535 24.9278 22.4265 24.8815C22.2095 24.7905 22.1342 24.7555 21.9855 24.6925C20.9811 24.2542 20.0512 23.662 19.2292 22.9373C19.0087 22.7448 18.804 22.5347 18.594 22.3317C17.9055 21.6724 17.3055 20.9265 16.809 20.1128L16.7057 19.9465C16.6316 19.8348 16.5716 19.7143 16.5272 19.5877C16.4607 19.3305 16.634 19.124 16.634 19.124C16.634 19.124 17.0592 18.6585 17.257 18.4065C17.4495 18.1615 17.6122 17.9235 17.7172 17.7538C17.9237 17.4213 17.9885 17.08 17.88 16.8158C17.39 15.6188 16.8825 14.427 16.361 13.244C16.2577 13.0095 15.9515 12.8415 15.6732 12.8082C15.5787 12.7977 15.4842 12.7872 15.3897 12.7802C15.1547 12.7686 14.9192 12.7709 14.6845 12.7873L15.0362 12.7732L15.038 12.775Z"
              fill="white"
            />
          </svg>
        </div>
      </button>
    </a>
  );
}

export default WhatsApp;
