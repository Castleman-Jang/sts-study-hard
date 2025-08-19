package kh.springboot.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import kh.springboot.common.interceptor.CheckAdminInterceptor;
import kh.springboot.common.interceptor.CheckLoginInterceptor;
import kh.springboot.common.interceptor.LogInterceptor;
import kh.springboot.common.interceptor.TestInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**")					// 맵핑 URL 설정 ex. addResourceHandler("/image/**") /image/어쩌고
				.addResourceLocations("file:///c:/uploadFiles/", "classpath:/static");	// 정적 리소스 위치
	}
	
	
	// Interceptor 등록 , 
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new TestInterceptor())		//인터셉터 등록한거임
				.addPathPatterns("/**");					//언터셉터가 가로챌 url등록하는거 
	
		registry.addInterceptor(new CheckLoginInterceptor())
				.addPathPatterns("/member/myInfo","/member/edit","/member/updatePassword","/membner/delete")
				.addPathPatterns("/board/**","/attm/**")
				.excludePathPatterns("/board/list","/attm/list","/board/search","/board/top"); // 이것들은 제외 하겠다.
				
		
		registry.addInterceptor(new CheckAdminInterceptor())
				.addPathPatterns("/admin/**");
		/*
		 	/member
		 	 	myInfo
		 	 	edit
		 	 	edit
		 	 	updatePassword
		 	 	delete
		 	 /board
		 	  	write
		 	  	insert
		 	  	{id}/{page}
		 	  	updForm
		 	  	update
		 	  	delete
		 	  	rinsert
		 	  	rdelete
		 	  	rupdate
		 	/attm
			 	write
			 	insert
			 	{id}/{page}
		 	
		 	  
		  		
		  		
		 */

		registry.addInterceptor(new LogInterceptor())
				.addPathPatterns("/member/signIn");
	}
	
}
