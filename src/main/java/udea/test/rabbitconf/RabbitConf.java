package udea.test.rabbitconf;

import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by David on 25/11/2017.
 */
@Configuration
public class RabbitConf {

  @Bean
  public ConnectionFactory connectionFactory(){
    CachingConnectionFactory connectionFactory = new CachingConnectionFactory("elephant.rmq.cloudamqp.com");
    connectionFactory.setUsername("vvyktpwm");
    connectionFactory.setPassword("qnTCT1lusVtLFXSyTDLmH0wA5xU0GxdF");
    connectionFactory.setVirtualHost("vvyktpwm");
    connectionFactory.setChannelCheckoutTimeout(10000);
    connectionFactory.setRequestedHeartBeat(30);
    return connectionFactory;
  }

  @Bean
  public RabbitTemplate rabbitTemplate() {
    final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
    rabbitTemplate.setMessageConverter(producerJackson2MessageConverter());
    return rabbitTemplate;
  }

  @Bean
  public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
    return new Jackson2JsonMessageConverter();
  }

}
